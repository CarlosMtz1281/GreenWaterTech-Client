from flask import Flask, request
import os
from back import getCampos, getCuadrantes

app = Flask(__name__)

@app.route('/api/getCampos', methods=['GET'])
def get_campos():
    user = request.args.get('user')
    campo = request.args.get('campo')
    response = getCampos(user, campo)
    return response

@app.route('/api/getCuadrantes', methods=['GET'])
def get_cuadrantes():
    user = request.args.get('user')
    campo = request.args.get('campo')
    cuadrante = request.args.get('cuadrante')
    response = getCuadrantes(user, campo, cuadrante)
    return response

if __name__ == '__main__':
    app.run(debug=True, host="3000")