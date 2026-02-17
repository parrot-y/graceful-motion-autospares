import os
from PIL import Image

def convert_to_webp(root_dir):
    print(f"Scanning {root_dir}...")
    converted_count = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(dirpath, filename)
                webp_path = os.path.splitext(file_path)[0] + ".webp"
                
                try:
                    with Image.open(file_path) as img:
                        img.save(webp_path, "WEBP", quality=85)
                        print(f"Converted: {filename} -> {os.path.basename(webp_path)}")
                        converted_count += 1
                except Exception as e:
                    print(f"Error converting {filename}: {e}")

    print(f"\nConversion complete! Total images converted: {converted_count}")

if __name__ == "__main__":
    convert_to_webp("src/assets/images")
