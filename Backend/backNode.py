import firebase_admin
from firebase_admin import credentials, db

# Acceder a la base de datos:
#Recuperar las credenciales del firebase
creds = credentials.Certificate('serviceAccCreds.json')

#link de la base de datos
url = 'https://greenwatertech-572bc-default-rtdb.firebaseio.com/'

#Iniciar la app con los permisos de la cuenta
firebase_admin.initialize_app(creds, {
    'databaseURL': url #Aqui va el url del firebase que tiene toda la info general
})

arrTemp=[]
arrHum=[]

def getTemp(temp, rute):
    arrTemp.append(temp)
    nodeRef = db.reference(rute)
    print(arrTemp)
    #Hacer promedio de los datos de una hora
    if(len(arrTemp)>59):
        for i in range(0,59):
            avrgTemp=avrgTemp+arrTemp[i]
        avrgTemp=avrgTemp/60
        arrTemp.clear()
        nodeRef.update({
            "Temperatura_lastHour" : avrgTemp
        })
    
    #Subir datos
    nodeRef.update({
        "Temperatura" : temp
    })

def getHum(hum, rute):
    arrHum.append(hum)
    nodeRef = db.reference(rute)
    print(arrHum)
    #Hacer promedio de los datos de una hora
    if(len(arrHum)>59):
        for i in range(0,59):
            avrgHum=avrgHum+arrHum[i]
        avrgHum=avrgHum/60
        arrHum.clear()
        nodeRef.update({
            "Humedad_lastHour" : avrgHum
        })
    
    #Subir datos
    nodeRef.update({
        "Humedad" : hum
    })