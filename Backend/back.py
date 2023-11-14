import firebase_admin
from firebase_admin import credentials, db

## Acceder a la base de datos:
#Recuperar las credenciales del firebase
creds = credentials.Certificate('Backend/serviceAccCreds.json')

#link de la base de datos
url = 'https://greenwatertech-572bc-default-rtdb.firebaseio.com/'

#Iniciar la app con los permisos de la cuenta
firebase_admin.initialize_app(creds, {
    'databaseURL': url #Aqui va el url del firebase que tiene toda la info general
})

userGlobal = "Fernando"

#Funciones para cambiar base de datos
def updateUser(user):
    #Cambiar nombre user
    refUser = db.reference(f"Users/{userGlobal}")
    data = refUser.get() #Guardr la info 
    refUserUpdated = db.reference(f"Users/{user}")
    userGlobal = user
    refUserUpdated.set(data) #Reescribir la info en la nueva ruta
    refUser.delete() #Borrar la anterior

def updateCampo(campo, campoNew):
    #Cambiar nombre campo
    campo = db.reference(f"Users/{userGlobal}/{campo}")
    dataC = campo.get()
    campoUpdated = db.reference(f"Users/{userGlobal}/{campoNew}")
    campoUpdated.set(dataC)
    campo.delete()

def updateCuadrante(campo, cuadrante, cuadranteNew):
    cuadrante = db.reference(f"Users/{userGlobal}/{campo}/{cuadrante}")
    data = cuadrante.get()
    cuadranteUpdated = db.reference(f"Users/{userGlobal}/{campo}/{cuadranteNew}")
    cuadranteUpdated.set(data)
    cuadrante.delete()
    

def updateCuadranteInfo(campo, cuadrante, planta, temp, hum):
    campo = db.reference(f"Users/{userGlobal}/{campo}/{cuadrante}")
    planta = campo.child(planta)
    planta.update({
        "Humedad" : hum,
        "Temperatura" : temp
    })

#Funciones para obtener los datos de la base de datos
def getUserInfo(user):
    data = db.reference(f'Users/{user}')
    userGlobal = user
    return data.get()

def getCampos(campo):
    data = db.reference(f'Users/{userGlobal}/{campo}')
    return data.get()

def getCuadrantes(campo, cuadrante):
    data = db.reference(f'User/{userGlobal}/{campo}/{cuadrante}')
    return data.get()


#Pruebas
ref = db.reference('Users')
ref_child = ref.child('Usuario_prueba3')
ref_child.set({
    "campo1":{
        "cuadrante1":{
            "planta1":{
                "Humedad" : 0,
                "Temperatura" : 0
            }
        }
    }
})

# .update() solo actualiza keys con values, para cambiar los nombres hay que crear otro nodo y reescribir la info;

updateCuadrante("el campillo", "cuadrante1", "el cuadrantillo")