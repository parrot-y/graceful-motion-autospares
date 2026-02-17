import os
import re

def minify_css(content):
    # Remove comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    # Remove extra whitespace
    content = re.sub(r'\s+', ' ', content)
    content = re.sub(r'\s*([\{\};:,])\s*', r'\1', content)
    return content.strip()

def minify_js(content):
    # Basic JS minification (remove comments and extra whitespace)
    # Note: rigorous JS minification is risky without a parser, so we'll be gentle
    content = re.sub(r'//.*', '', content) # Remove single line comments
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL) # Remove multi-line comments
    content = re.sub(r'\s+', ' ', content) # Collapse whitespace
    content = re.sub(r'\s*([\{\}\(\)\[\];:,=+\-*/])\s*', r'\1', content) # Collapse around operators
    return content.strip()

def process_file(file_path):
    ext = os.path.splitext(file_path)[1]
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_size = len(content)
    
    if ext == '.css':
        minified = minify_css(content)
    elif ext == '.js':
        minified = minify_js(content)
    else:
        return

    new_size = len(minified)
    
    # Create minified file
    min_path = os.path.splitext(file_path)[0] + '.min' + ext
    with open(min_path, 'w', encoding='utf-8') as f:
        f.write(minified)
        
    print(f"Minified {os.path.basename(file_path)}: {original_size} -> {new_size} bytes ({(1 - new_size/original_size)*100:.1f}% saved)")

def scan_and_minify(root_dir):
    print(f"Scanning {root_dir} for CSS/JS...")
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(('.css', '.js')) and not filename.endswith('.min.css') and not filename.endswith('.min.js'):
                process_file(os.path.join(dirpath, filename))

if __name__ == "__main__":
    scan_and_minify("src/styles")
    scan_and_minify("src/scripts")
