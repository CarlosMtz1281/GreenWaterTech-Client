from flask import Flask, request, session
import os
import random
from backFirebase import getCampos, getCuadrantes, getUserInfo, updateUser, updateCampo, updateCuadrante, updateCuadranteInfo
from backNode import getTemp, getHum
from flask_cors import CORS

app = Flask(__name__, static_folder="build")
app.secret_key = "FerEsLaVergaYeaBoy!"

CORS(app, origins=["https://gwt-back.uc.r.appspot.com", "http://localhost:8000"])

#Session info
@app.route('/api/login', methods=['GET'])
def login():
    user = request.args.get('user')
    session['user'] = user
    session['temp'] = 0
    session['tempCount'] = 0
    session['hum'] = 0
    session['humCount'] = 0
    return "Logged in"


@app.route('/test', methods=['GET'])
def test():
    user = session['user']
    rute = f'{user}/campo/cuadrante/planta1'
    # Simulate temperature data
    for i in range(100):
        temp = random.randint(0, 30)
        getTemp(temp, rute, session)
    return "Test completed"

##Firebase
#Gets
@app.route('/api/getUser', methods=['GET'])
def get_user():
    user = session['user']
    response = getUserInfo(user)
    return response

@app.route('/api/getCampos', methods=['GET'])
def get_campos():
    #if request.is_json
    user = session['user']
    campo = request.args.get('campo')
    response = getCampos(user, campo)
    return response

@app.route('/api/getCuadrantes', methods=['GET'])
def get_cuadrantes():
    #if request.is_json
    user = session['user']
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    response = getCuadrantes(user, campo, cuadrante)
    return response

#Updates
@app.route('/api/updateUser', methods=['POST'])
def update_user():
    user = session['user']
    userNew = request.args.get('userNew')
    updateUser(user, userNew)
    return "Updated user"

@app.route('/api/updateCampo', methods=['POST'])
def update_campo():
    user = session['user']
    campo = request.args.get('campo')
    campoNew = request.args.get('campoNew')
    updateCampo(user, campo, campoNew)
    return "Updated campo"

@app.route('/api/updateCuadrante', methods=['POST'])
def update_cuadrante():
    user = session['user']
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    cuadranteNew = request.args.get('cuadranteNew')
    updateCuadrante(user, campo, cuadrante, cuadranteNew)
    return "Updated cuadrante"

@app.route('/api/updateCuadranteInfo', methods=['POST'])
def update_cuadranteInfo():
    user = session['user']
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    planta = request.args.get('planta')
    temp = request.args.get('temp')
    hum = request.args.get('hum')
    updateCuadranteInfo(user, campo, cuadrante, planta, temp, hum)
    return "Updated cuadrante info"


##NodeMCU
@app.route('/node/Temp', methods=['POST'])
def node_temp():
    data = request.get_json()
    temp = data.get('temp')
    rute = data.get('rute')
    getTemp(temp, rute, session)
    return "Temp received"

@app.route('/node/Hum', methods=['POST'])
def node_hum():
    data = request.get_json()
    hum = data.get('hum')
    rute = data.get('rute')
    getHum(hum, rute, session)
    return "Hum received"

if __name__ == '__main__':
    app.run(host="localhost", port="8000", debug=True, threaded=True, use_reloader=True)