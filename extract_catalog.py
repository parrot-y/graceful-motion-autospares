import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    """
    Take the path of a docx file as argument, return the text in unicode.
    """
    document = zipfile.ZipFile(path)
    xml_content = document.read('word/document.xml')
    document.close()
    tree = ET.fromstring(xml_content)

    # Simplified extraction of text from XML
    namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    paragraphs = []
    for paragraph in tree.findall('.//w:p', namespace):
        texts = [node.text for node in paragraph.findall('.//w:t', namespace) if node.text]
        if texts:
            paragraphs.append("".join(texts))
    return "\n".join(paragraphs)

if __name__ == "__main__":
    import sys
    doc_path = "/home/maskgod/Documents/FRONT_END_WEB_DEVELOPMENT_COURSE/AUTOSPARES/CAR DETAILS  FINAL 1.docx"
    try:
        text = get_docx_text(doc_path)
        print(text)
    except Exception as e:
        print(f"Error: {e}")
