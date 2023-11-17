from flask import Flask, request
import os
from back import getCampos, getCuadrantes, getUserInfo
from flask_cors import CORS

app = Flask(__name__, static_folder="build")

CORS(app, origins=["https://gwt-back.uc.r.appspot.com"])

@app.route('/api/getUser', methods=['GET'])
def get_user():
    #if request.is_json
    user = request.args.get('user')
    response = getUserInfo(user)
    return response

@app.route('/api/getCampos', methods=['GET'])
def get_campos():
    #if request.is_json
    user = request.args.get('user')
    campo = request.args.get('campo')
    response = getCampos(user, campo)
    return response

@app.route('/api/getCuadrantes', methods=['GET'])
def get_cuadrantes():
    #if request.is_json
    user = request.args.get('user')
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    response = getCuadrantes(user, campo, cuadrante)
    return response

if __name__ == '__main__':
    app.run(port="5000", debug=True, threaded=True, use_reloader=True)