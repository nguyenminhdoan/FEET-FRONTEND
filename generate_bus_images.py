"""
Generate placeholder bus images for the BusVisualization component
Creates base bus images and subsystem highlight overlays
"""
from PIL import Image, ImageDraw, ImageFont
import os

# Configuration
OUTPUT_DIR = "public/buses"
IMAGE_WIDTH = 1600
IMAGE_HEIGHT = 600

# Bus configurations - Generate both standard and articulated for all makes
MANUFACTURERS = ["new_flyer", "gillig", "nova_bus", "proterra", "byd", "alexander_dennis"]
BUS_CONFIGS = []
for make in MANUFACTURERS:
    BUS_CONFIGS.append((make, "standard"))
    BUS_CONFIGS.append((make, "articulated"))

# Subsystems with their positions (x, y, width, height) as percentages
SUBSYSTEMS = {
    "hv_battery": {
        "name": "HV Battery",
        "position": (0.35, 0.65, 0.25, 0.20),  # bottom middle
        "color": (0, 160, 57, 180)  # green with alpha
    },
    "traction_motor": {
        "name": "Traction Motor",
        "position": (0.50, 0.70, 0.15, 0.15),  # bottom rear
        "color": (0, 160, 57, 180)
    },
    "hvac_roof": {
        "name": "Roof HVAC",
        "position": (0.40, 0.15, 0.20, 0.12),  # top middle
        "color": (0, 160, 57, 180)
    },
    "air_compressor": {
        "name": "Air Compressor",
        "position": (0.65, 0.70, 0.12, 0.15),  # bottom front-right
        "color": (0, 160, 57, 180)
    }
}

# Colors
BODY_COLOR = (224, 224, 224)  # Light gray
WINDOW_COLOR = (179, 217, 255)  # Light blue
WHEEL_COLOR = (51, 51, 51)  # Dark gray
OUTLINE_COLOR = (108, 109, 112)  # Gray from color scheme
FRONT_COLOR = (240, 240, 240)  # Very light gray
LIGHT_COLOR = (255, 215, 0)  # Gold


def draw_bus(draw, width, height, is_articulated=False):
    """Draw a simple side-view bus"""

    # Calculate dimensions
    bus_length = width * 0.85 if not is_articulated else width * 0.90
    bus_height = height * 0.50
    bus_x = width * 0.05
    bus_y = height * 0.27

    # Draw main bus body
    draw.rectangle(
        [(bus_x, bus_y), (bus_x + bus_length, bus_y + bus_height)],
        fill=BODY_COLOR,
        outline=OUTLINE_COLOR,
        width=4
    )

    # Draw windows
    window_count = 14 if is_articulated else 10
    window_width = 50
    window_height = 80
    window_spacing = (bus_length - 100) / window_count

    for i in range(window_count):
        x = bus_x + 80 + i * window_spacing
        y = bus_y + 30
        draw.rectangle(
            [(x, y), (x + window_width, y + window_height)],
            fill=WINDOW_COLOR,
            outline=OUTLINE_COLOR,
            width=3
        )

    # Draw front section
    front_width = 60
    draw.rectangle(
        [(bus_x, bus_y), (bus_x + front_width, bus_y + bus_height)],
        fill=FRONT_COLOR,
        outline=OUTLINE_COLOR,
        width=4
    )

    # Draw headlight
    draw.ellipse(
        [(bus_x + 20, bus_y + 40), (bus_x + 36, bus_y + 56)],
        fill=LIGHT_COLOR,
        outline=OUTLINE_COLOR,
        width=2
    )

    # Draw wheels
    wheel_radius = 35
    wheel_y = bus_y + bus_height + wheel_radius - 10

    wheels_x = [
        bus_x + 150,
        bus_x + bus_length / 2 if not is_articulated else bus_x + bus_length * 0.45,
        bus_x + bus_length - 100
    ]

    for wheel_x in wheels_x:
        # Wheel
        draw.ellipse(
            [(wheel_x - wheel_radius, wheel_y - wheel_radius),
             (wheel_x + wheel_radius, wheel_y + wheel_radius)],
            fill=WHEEL_COLOR,
            outline=OUTLINE_COLOR,
            width=4
        )
        # Hub
        draw.ellipse(
            [(wheel_x - 15, wheel_y - 15),
             (wheel_x + 15, wheel_y + 15)],
            fill=(80, 80, 80),
            outline=OUTLINE_COLOR,
            width=2
        )

    # Draw articulation joint for articulated buses
    if is_articulated:
        joint_x = bus_x + bus_length * 0.50
        draw.rectangle(
            [(joint_x - 10, bus_y), (joint_x + 10, bus_y + bus_height)],
            fill=(153, 153, 153),
            outline=OUTLINE_COLOR,
            width=3
        )

    # Draw roof details (HVAC area indicator)
    roof_x = bus_x + bus_length * 0.40
    roof_width = bus_length * 0.20
    draw.rectangle(
        [(roof_x, bus_y - 5), (roof_x + roof_width, bus_y + 5)],
        fill=(200, 200, 200),
        outline=OUTLINE_COLOR,
        width=2
    )


def create_base_image(make, length_type):
    """Create a base bus image"""
    img = Image.new('RGB', (IMAGE_WIDTH, IMAGE_HEIGHT), color='white')
    draw = ImageDraw.Draw(img)

    is_articulated = length_type == "articulated"
    draw_bus(draw, IMAGE_WIDTH, IMAGE_HEIGHT, is_articulated)

    # Add text label
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except:
        font = ImageFont.load_default()

    label = f"{make.replace('_', ' ').title()} - {length_type.title()}"
    draw.text((50, 50), label, fill=OUTLINE_COLOR, font=font)

    return img


def create_highlight_overlay(subsystem_key, subsystem_info):
    """Create a transparent highlight overlay for a subsystem"""
    img = Image.new('RGBA', (IMAGE_WIDTH, IMAGE_HEIGHT), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Get position
    x_pct, y_pct, w_pct, h_pct = subsystem_info["position"]
    x = int(IMAGE_WIDTH * x_pct)
    y = int(IMAGE_HEIGHT * y_pct)
    w = int(IMAGE_WIDTH * w_pct)
    h = int(IMAGE_HEIGHT * h_pct)

    # Draw highlight box
    draw.rectangle(
        [(x, y), (x + w, y + h)],
        fill=subsystem_info["color"],
        outline=(0, 160, 57, 255),
        width=6
    )

    # Add glow effect
    for i in range(3):
        offset = (i + 1) * 8
        alpha = 60 - (i * 15)
        draw.rectangle(
            [(x - offset, y - offset), (x + w + offset, y + h + offset)],
            outline=(0, 160, 57, alpha),
            width=4
        )

    return img


def main():
    """Generate all bus images"""
    print("Generating placeholder bus images...")

    # Create output directory structure
    for make, length in BUS_CONFIGS:
        config_dir = os.path.join(OUTPUT_DIR, f"{make}_{length}")
        os.makedirs(config_dir, exist_ok=True)

        # Generate base image
        print(f"  Creating base image for {make} {length}...")
        base_img = create_base_image(make, length)
        base_img.save(os.path.join(config_dir, "base.png"))

        # Generate subsystem highlights
        for subsystem_key, subsystem_info in SUBSYSTEMS.items():
            print(f"    Creating highlight for {subsystem_info['name']}...")
            highlight_img = create_highlight_overlay(subsystem_key, subsystem_info)
            highlight_img.save(os.path.join(config_dir, f"{subsystem_key}_highlight.png"))

    print(f"\n✅ Generated {len(BUS_CONFIGS)} bus configurations")
    print(f"✅ Created {len(SUBSYSTEMS)} highlight overlays for each configuration")
    print(f"✅ Total images: {len(BUS_CONFIGS) * (1 + len(SUBSYSTEMS))}")
    print(f"\nImages saved to: {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
