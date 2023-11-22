import firebase_admin
from firebase_admin import credentials, db

# Acceder a la base de datos:
#Recuperar las credenciales del firebase
if not firebase_admin._apps:
    creds = credentials.Certificate('serviceAccCreds.json')

    #link de la base de datos
    url = 'https://greenwatertech-572bc-default-rtdb.firebaseio.com/'

    #Iniciar la app con los permisos de la cuenta
    firebase_admin.initialize_app(creds, {
        'databaseURL': url #Aqui va el url del firebase que tiene toda la info general
    })


def getTemp(temp, rute, session):
    session['temp'] += temp
    session['tempCount'] += 1
    nodeRef = db.reference(f"Users/{rute}")
    #Hacer promedio de los datos de una hora
    if session['tempCount'] > 59:
        avrgTemp = session['temp']/60
        nodeRef.update({
            "Temperatura_lastHour" : avrgTemp
        })
        session['temp'] = 0
        session['tempCount'] = 0
    
    #Subir datos
    nodeRef.update({
        "Temperatura" : temp
    })

def getHum(hum, rute, session):
    session['hum'] += hum
    session['humCount'] += 1
    nodeRef = db.reference(f"Users/{rute}")
    #Hacer promedio de los datos de una hora
    if session['humCount'] > 59:
        avrgHum = session['hum']/60
        nodeRef.update({
            "Humedad_lastHour" : avrgHum
        })
        session['hum'] = 0
        session['humCount'] = 0
    
    #Subir datos
    nodeRef.update({
        "Humedad" : hum
    })

