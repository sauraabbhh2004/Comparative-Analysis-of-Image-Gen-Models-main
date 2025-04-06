from flask import Flask, jsonify, request, send_file
import os
import urllib.request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../segment-anything-2/notebooks')))
from main import *
import pymongo
import base64

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

# client = pymongo.MongoClient('mongodb://localhost:27017/Img_segs') 
# database = client["image_database"]
# collection = database["image_collection"]

client = pymongo.MongoClient('mongodb://172.31.240.1:27017/Img_segs') 
database = client["image_database"]
collection = database["image_collection"]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


global_prompt = "A single, perfectly ripe red apple, with a deep crimson hue, resting on a soft, slightly textured background. The background should be a light, warm beige color, reminiscent of a canvas or parchment. The apple should be the main focus of the image, with a strong light source highlighting its glossy surface and casting a gentle shadow."
global_image = r'/mnt/e/projects/img_seg/fsd/backend/reactPyMini/static/uploads/sample.png'
init_image = r'/mnt/e/projects/img_seg/fsd/backend/reactPyMini/static/uploads/sample.png'
global global_res
global_res = {
    'global_contrast_sim': 12.23,
    'local_contrast_sim': 0.345,
    'label_sim': 34.54,
    'texture_sim': 342,
    'restnet_sim': 654,
    'aggregated_sim': 1234.34
}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
    
    files = request.files.getlist('files[]')

    errors = {}
    success = False

    for file in files:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            try:
                prompt, IMAGE_PATH, masks, labels, labels_with_colors, image = get_prompt(file_path)
                prompt_data = {
                    "prompt": prompt,
                    "IMAGE_PATH": IMAGE_PATH,
                    "masks": masks.tolist(),  # Convert numpy array to list for JSON serialization
                    "labels": labels,
                    "labels_with_colors": labels_with_colors,
                    "image": image.tolist()  # Convert numpy array to list for JSON serialization
                }
                global ini_image
                ini_image = IMAGE_PATH
                global global_prompt
                global_prompt = prompt
                global mask
                mask = masks
                global label
                label = labels
                global label_with_color
                label_with_color = labels_with_colors
                global img
                img = image
                resp = jsonify({
                    "message": 'File successfully uploaded',
                    "status": 'success',
                    "prompt_data": prompt_data
                })
                resp.status_code = 201
                return resp
        
            except Exception as e:
                resp = jsonify({
                    "message": str(e),
                    "status": 'failed'
                })
                resp.status_code = 500
                return resp
            
        else:
            resp = jsonify({
                "message": 'No file part in the request',
                "status": 'failed'
            })  
            return resp   

    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'       
        errors['status'] = 'failed'  
        resp = jsonify(errors)
        resp.status_code = 500
        return resp  
    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'success'
        })   
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    


global Model_name
global flag
@app.route('/generated-prompt', methods=['GET'])
def generated_prompt():
    
    flag = 1
    try:
        return jsonify({
            'prompt': global_prompt
        })
    except Exception as e:
        return jsonify({
            'error': str(e)
}),500
    


from asyncio import run, sleep
@app.route('/generated-image', methods=['GET'])
async def generated_image():
    global global_image
    global Model_name
    
    # Simulate image generation delay
    await sleep(1)
    # if flag:
    global_image, Model_name = generate_image(global_prompt)
    global_image = "/mnt/e/projects/img_seg/fsd/backend/reactPyMini/generated_image.png"
    global_con_sim,ssim_sim,similarity_by_no_objs,texture_sim,restnet_sim, agg_score = get_similarity_scores( global_image, ini_image, mask, label, label_with_color, img)
    global_res['global_contrast_sim'] = float(global_con_sim)
    global_res['local_contrast_sim'] = float(ssim_sim)
    global_res['label_sim'] = float(similarity_by_no_objs)
    global_res['texture_sim'] = float(texture_sim)
    global_res['restnet_sim'] = float(restnet_sim)
    global_res['aggregated_sim'] = float(agg_score)
    print(global_res)
    
    
    try:
        # Determine the mimetype based on the file extension
        if global_image.lower().endswith(('.jpg', '.jpeg')):
            mimetype = 'image/jpeg'
        elif global_image.lower().endswith('.png'):
            mimetype = 'image/png'
        else:
            return jsonify({'error': 'Unsupported image format'}), 400

        with open(global_image, 'rb') as img1:
            gen_img = img1.read()
        
        return jsonify({
            'image': gen_img.hex(),
            'model': Model_name
        })
        # return send_file(global_image, mimetype=mimetype)
    except FileNotFoundError:
        return jsonify({'error': 'Image not found'}), 404


def extract_filename(file_path):
    return os.path.basename(file_path)

@app.route('/results', methods=['GET'])
def final_results():
    try:
        # Open images and convert to binary blobs
        
        with open(ini_image, 'rb') as img1, open(global_image, 'rb') as img2:
            img1_blob = img1.read()
            img2_blob = img2.read()
        print(global_res)
        with open(ini_image, 'rb') as init_img_file:
            init_img_encoded = base64.b64encode(init_img_file.read()).decode('utf-8')

        with open(global_image, 'rb') as gen_img_file:
            gen_img_encoded = base64.b64encode(gen_img_file.read()).decode('utf-8')
        data = {
            'img_name': str(extract_filename(ini_image)),
            'initial_image': str(init_img_encoded),
            'generated_image': str(gen_img_encoded),
            'global_contrast_sim': str(global_res['global_contrast_sim']),
            'local_contrast_sim': str(global_res['local_contrast_sim']),
            'label_sim': str(global_res['label_sim']),
            'texture_sim': str(global_res['texture_sim']),
            'restnet_sim': str(global_res['restnet_sim']),
            'aggregated_sim': str(global_res['aggregated_sim']),
            'model': str(Model_name)
        }
        send_data(data)
        return jsonify({
            'initial_image': img1_blob.hex(),
            'generated_image': img2_blob.hex(),
            'global_contrast_sim': global_res['global_contrast_sim'],
            'local_contrast_sim': global_res['local_contrast_sim'],
            'label_sim': global_res['label_sim'],
            'texture_sim': global_res['texture_sim'],
            'restnet_sim': global_res['restnet_sim'],
            'aggregated_sim': global_res['aggregated_sim'],
            'model': Model_name
        })
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)

