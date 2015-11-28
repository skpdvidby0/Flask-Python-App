







import os
from flask.ext.mysql import MySQL
from flask import Flask, render_template, json, request, session, redirect
app = Flask(__name__)
app.secret_key = 'dhakkalagabukka'
mysql = MySQL()
#host1=os.getenv('OPENSHIFT_MYSQL_DB_HOST')
app.config['MYSQL_DATABASE_USER'] = 'admin7YSeANi'
app.config['MYSQL_DATABASE_PASSWORD'] = ' ShMwe1xM2sV4'
app.config['MYSQL_DATABASE_DB'] = 'projectdb_schema'
app.config['MYSQL_DATABASE_HOST'] = ' ex-std-node455.prod.rhcloud.com'
mysql.init_app(app)
@app.route('/')
def main():
     return render_template('index.html')
@app.route('/showSignUp')
def showSignUp():
     return render_template('signup.html')

@app.route('/showSignin')
def showSignin():
    return render_template('signin.html')

@app.route('/userHome')
def userHome():
    if session.get('user'):
        return render_template('userHome.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')    

@app.route('/validateLogin',methods=['POST','GET'])
def validateLogin():
    try:
        _username = request.form['inputuName']
        _password = request.form['inputPassword']
 
        #_hashed_password = generate_password_hash(_password)
        
 
        # connect to mysql
 
        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('sp_validateLogin',(_username,))
        data = cursor.fetchall()
        #flash('sd')
      
 
 
 
        if len(data) > 0:
            if str(data[0][6]) == _password :
                session['user'] = data[0][4]
                return redirect('/userHome')
            else:
                return render_template('error.html',error = _hashed_password)
                #str(data[0][6])
        else:
            return render_template('error.html',error = 'Wrong Email address or Password.')
 
 
    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()



if __name__ == '__main__':
    app.run() 





# from flask.ext.mysql import MySQL
# from werkzeug import generate_password_hash, check_password_hash

# mysql = MySQL()
# app = Flask(__name__)
# app.secret_key = 'dhakkalagabukka'

# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = 'tiger'
# app.config['MYSQL_DATABASE_DB'] = 'projectdb_schema'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# mysql.init_app(app)




# #mainpage
# @app.route('/')
# def main():
#     return render_template('index.html')
# #mainpage duplicate
# @app.route('/home')
# def home():
#     return render_template('index.html')


# #signuppage
# @app.route('/showSignUp')
# def showSignUp():
#     return render_template('signup.html')


# #siginpage
# @app.route('/showSignin')
# def showSignin():
#     return render_template('signin.html')


# @app.route('/userHome')
# def userHome():
#     if session.get('user'):
#         return render_template('userHome.html')
#     else:
#         return render_template('error.html',error = 'Unauthorized Access')    


# #sessioncounter
# def sumSessionCounter():
#   try:
#     session['counter'] += 1
#   except KeyError:
#     session['counter'] = 1   


# #signupactually


# @app.route('/signUp',methods=['POST','GET'])
# def signUp():
#     try:
#         _fname = request.form['inputfName']
#         _lname = request.form['inputlName'] 
#         _uname = request.form['inputuName']
#         _uaddress = request.form['inputuaddress']
#         _uphone = request.form['inputphone']
#         _email = request.form['inputEmail']
#         _password = request.form['inputPassword']
#         # validate the received values
#                                   # if _fname and _email and _password and _lname and _uname and _uaddress and _uphone :
#                                    #   return json.dumps({'html':'<span>All fields good !!</span>'})
#                                    #else:
#                                    #  return json.dumps({'html':'<span>Enter the required fields</span>'})
#         if _fname and _email and _password and _lname and _uname and _uaddress and _uphone :
              
       
#             # All Good, let's call MySQL
         
#             conn = mysql.connect()
#             cursor = conn.cursor()
#             _hashed_password = generate_password_hash(_password)
#             cursor.callproc('sp_createUser',(_fname,_lname,_uname,_uaddress,_uphone,  _password,_email))
#             data = cursor.fetchall()
            
#             if len(data) is 0:
#                 conn.commit()
#                 #return json.dumps({'message':'User created successfully !'})
#                 session['user'] = _uname
#                 return render_template('userHome.html')
#             else:
#                 return json.dumps({'error':str(data[0])})
#         else:
#             return json.dumps({'html':'<span>Enter the required fields</span>'})

#     except Exception as e:
#         return json.dumps({'error':str(e)})
#     finally:
#         cursor.close() 
#         conn.close()

        

# #sigin actually

# @app.route('/validateLogin',methods=['POST'])
# def validateLogin():
#     try:
#         _username = request.form['inputuName']
#         _password = request.form['inputPassword']
 
#         #_hashed_password = generate_password_hash(_password)
        
 
#         # connect to mysql
 
#         con = mysql.connect()
#         cursor = con.cursor()
#         cursor.callproc('sp_validateLogin',(_username,))
#         data = cursor.fetchall()
#         #flash('sd')
      
 
 
 
#         if len(data) > 0:
#             if str(data[0][6]) == _password :
#                 session['user'] = data[0][4]
#                 return redirect('/userHome')
#             else:
#                 return render_template('error.html',error = _hashed_password)
#                 #str(data[0][6])
#         else:
#             return render_template('error.html',error = 'Wrong Email address or Password.')
 
 
#     except Exception as e:
#         return render_template('error.html',error = str(e))
#     finally:
#         cursor.close()
#         con.close()




# #display driver on map
# @app.route('/driverdisplay',methods=['POST','GET'])
# def driverdisplay():
#     try:
#        con = mysql.connect()
#        cursor = con.cursor()
#        query = "Select * from driver_loc;"
#        cursor.execute(query);
#        data = cursor.fetchall();
       
#        ##if len(data) > 0:
#        # data_dict = {}
#        # for data1 in data:
#        #     data1_dict = {data1[0],data1[1],data1[2],data[3] }
#        #     data_dict.append(data1_dict)
#        # print data_dict        
#        return json.dumps(data)               
#        # else:
#         #    return render_template('error.html',error = 'Wrong Email address or Password.')
#       # return render_template('index.html',error = str(data[0])) 
 
#     except Exception as e:
#         return render_template('error.html',error = str(e))
#     finally:
#         cursor.close()
#         con.close()




# #bookinpage
# #@app.route('/bookdriver',methods=['POST','GET'])
# def bookdriver(request):
#     if(request.GET.get('bt3')):
#            return render_template('error.html')


# # def request_page(request):
# #   if(request.GET.get('mybtn')):
# #     mypythoncode.mypythonfunction( int(request.GET.get('mytextbox')) )
# # return render_to_response('myApp/templateHTML.html')
# #logout
# @app.route('/logout')
# def logout():
#     session.pop('user',None)
#     return redirect('/')

# def sumSessionCounter():
#   try:
#     session['counter'] += 1
#   except KeyError:
#     session['counter'] = 1    




        
        


if __name__ == "__main__":
     app.run(debug=True)

