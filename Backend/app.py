from flask import Flask, request
import os
from backFirebase import getCampos, getCuadrantes, getUserInfo, updateUser, updateCampo, updateCuadrante, updateCuadranteInfo
from backNode import getTemp, getHum
from flask_cors import CORS

app = Flask(__name__, static_folder="build")

CORS(app, origins=["https://gwt-back.uc.r.appspot.com"])

##Firebase
#Gets
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

#Updates
@app.route('/api/updateUser', methods=['POST'])
def update_user():
    user = request.args.get('user')
    updateUser(user)

@app.route('/api/updateCampo', methods=['POST'])
def update_campo():
    campo = request.args.get('campo')
    campoNew = request.args.get('campoNew')
    updateCampo(campo, campoNew)

@app.route('/api/updateCuadrante', methods=['POST'])
def update_cuadrante():
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    cuadranteNew = request.args.get('cuadranteNew')
    updateCuadrante(campo, cuadrante, cuadranteNew)

@app.route('/api/updateCuadranteInfo', methods=['POST'])
def update_cuadranteInfo():
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    planta = request.args.get('planta')
    temp = request.args.get('temp')
    hum = request.args.get('hum')
    updateCuadranteInfo(campo, cuadrante, planta, temp, hum)


##NodeMCU
@app.route('/node/Temp', methods=['POST'])
def node_temp():
    temp = request.args.get('temp')
    rute = request.args.get('rute')
    getTemp(temp, rute)

@app.route('/node/Hum', methods=['POST'])
def node_hum():
    hum = request.args.get('hum')
    rute = request.args.get('rute')
    getHum(hum, rute)

if __name__ == '__main__':
    app.run(port="5000", debug=True, threaded=True, use_reloader=True)