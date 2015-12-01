
import os
import urlparse

import sys, logging
logging.basicConfig(stream = sys.stderr)




	

from flask import Flask, render_template, json, request, session, redirect
from flask.ext.mysql import MySQL
app = Flask(__name__)
app.secret_key = 'dhakkalagabukka'
mysql = MySQL()

url = urlparse.urlparse('mysql://admin7YSeANi:ShMwe1xM2sV4@127.12.232.130:3306')

user = url.username,
pass1 = url.password,
host= url.hostname,
port = url.port
        

app.config['MYSQL_DATABASE_PORT'] = 3306
#host1=os.getenv('OPENSHIFT_MYSQL_DB_HOST')
app.config['MYSQL_DATABASE_USER'] = 'admin7YSeANi'
app.config['MYSQL_DATABASE_PASSWORD'] = 'ShMwe1xM2sV4'
app.config['MYSQL_DATABASE_DB'] = 'projectdb_schema'

#app.config['MYSQL_DATABASE_HOST'] = 'ex-std-node455.prod.rhcloud.com'
app.config['MYSQL_DATABASE_HOST'] = '127.12.232.130'


mysql.init_app(app)
#mainpage
@app.route('/')
def main():
    return render_template('index.html')
#mainpage duplicate
@app.route('/home')
def home():
    return render_template('index.html')


#signuppage
@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')


#siginpage
@app.route('/showSignin')
def showSignin():
    return render_template('signin.html')


@app.route('/userHome')
def userHome():
    if session.get('user'):
        return render_template('userHome.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')   

#driverhome
@app.route('/driverhome')
def driverhome():
    if session.get('user'):
        return render_template('driverpage.html',user1=str(session['user']))
    else:
        return render_template('error.html',error = 'Unauthorized Access')  




app.route('/userHome1')
def userHome1():
    if session.get('user'):
        return render_template('userHome.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')   
@app.route('/driverSignUp')
def driverSignUp():
    return render_template('driversignup.html')

@app.route('/driverSignin')
def driverSignin():
    return render_template('driversignin.html')    
#sessioncounter
def sumSessionCounter():
  try:
    session['counter'] += 1
  except KeyError:
    session['counter'] = 1   


#signupactually


@app.route('/signUp',methods=['POST','GET'])
def signUp():
    try:
        _fname = request.form['inputfName']
        _lname = request.form['inputlName'] 
        _uname = request.form['inputuName']
        _uaddress = request.form['inputuaddress']
        _uphone = request.form['inputphone']
        _email = request.form['inputEmail']
        _password = request.form['inputPassword']
        # validate the received values
                                  # if _fname and _email and _password and _lname and _uname and _uaddress and _uphone :
                                   #   return json.dumps({'html':'<span>All fields good !!</span>'})
                                   #else:
                                   #  return json.dumps({'html':'<span>Enter the required fields</span>'})
        if _fname and _email and _password and _lname and _uname and _uaddress and _uphone :
              
       
            # All Good, let's call MySQL
         
            conn = mysql.connect()
            cursor = conn.cursor()
            #_hashed_password = generate_password_hash(_password)
            cursor.callproc('sp_createUser',(_fname,_lname,_uname,_uaddress,_uphone,  _password,_email))
            data = cursor.fetchall()
            
            if len(data) is 0:
                conn.commit()
                #return json.dumps({'message':'User created successfully !'})
                session['user'] = _uname
                return render_template('userHome.html')
            else:
                return json.dumps({'error':str(data[0])})
        else:
            return json.dumps({'html':'<span>Enter the required fields</span>'})

    except Exception as e:
        return json.dumps({'error':str(e)})
    finally:
        cursor.close() 
        conn.close()

        

#sigin actually

@app.route('/validateLogin',methods=['POST'])
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
                session['user'] = data[0][3]
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


         	

#pushdatatobookingtable
# @app.route('/bookdata',methods=['POST','GET'])
# def bookdata():
# 	_driverid = request.form['in1']
# 	return render_template('error.html',error=_driverid)
@app.route('/bookdata',methods=['POST','GET'])
def bookdata():
    try:
        #_username1 = str(session['user'])
        usernameu=str(session['user'])
        sourceu = request.form['in1']
        dest2 = request.form['in2']
        did1 = request.form['in3']
        dname1 = request.form['in4']
        eta1 = request.form['in5']
        fare1 = request.form['in6']
        driverstat1=1
        bookinid=randint(10000,99999)
        #_bookinid=2
 
        #_hashed_password = generate_password_hash(_password)
        
 
        # connect to mysql
         
        conn = mysql.connect()
        cursor = conn.cursor()
        #cursor.callproc('sp_createUser',(usernameu,sourceu,dest2,did1,dname1,driverstat1,fare1))
        cursor.callproc('sp_booktable',(usernameu,bookinid,sourceu,dest2,did1,dname1,eta1,fare1,driverstat1,))
        #user_table_data = [username1,bookinid]
        #cursor.execute("insert into booking_detail1 (username1,booking_id) values(%s,%s)",user_table_data)
        #query = "insert into  booking_detail1(username1,booking_id) values(%s,%s)"
        #cursor.execute("insert into  booking_detail1(username1,booking_id) values('skp','art2')")
        #cursor.callproc('sp_booktable2',(usernameu,sourceu))
        #cursor.execute("insert into booking_detail1(username1,booking_id,source,destination,driverid,drivername,eta,fare,driver_status1)values(%s,%s,%s,%s,%s,%s,%s,%s,%s);",(_username,_bookinid,_source1,_dest2,_did,_dname,_eta,_fare,_driverstat))
        data = cursor.fetchall()
        if len(data) is 0:
        	conn.commit()
        	return render_template('error.html',error = eta1)

        else:
            return render_template('error.html',error = str(data[0][1]))
 
 
    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        conn.close()

#display driver on map	
@app.route('/driverdisplay',methods=['POST','GET'])
def driverdisplay():
    try:
       con = mysql.connect()
       cursor = con.cursor()
       query = "Select * from driver_loc;"
       cursor.execute(query);
       data = cursor.fetchall();
       
       ##if len(data) > 0:
       # data_dict = {}
       # for data1 in data:
       #     data1_dict = {data1[0],data1[1],data1[2],data[3] }
       #     data_dict.append(data1_dict)
       # print data_dict        
       return json.dumps(data)               
       # else:
        #    return render_template('error.html',error = 'Wrong Email address or Password.')
      # return render_template('index.html',error = str(data[0])) 
 
    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()

#bookinpage
#@app.route('/bookpage',methods=['POST','GET'])

#bookingpagecall
# @app.route('/bookdriver',methods=['POST','GET'])
# def bookdriver():
    
#         return render_template('error.html')

@app.route('/bookdriver',methods=['POST','GET'])
def bookdriver():
	if session.get('user'):
		_source = request.form['source']
		_destination = request.form['destination'] 
		return render_template('bookpage.html',source1=str(_source),dest1=str(_destination))
	else:
	    return render_template('error.html',error='Unauthorized Access')	
	

# @app.route('/bookdriver')
# def userHome():
#     if session.get('user'):
#         return render_template('bookpage.html')
#     else:
#         return render_template('error.html',error = 'Unauthorized Access')             


# def request_page(request):
#   if(request.GET.get('mybtn')):
#     mypythoncode.mypythonfunction( int(request.GET.get('mytextbox')) )
# return render_to_response('myApp/templateHTML.html')
#logout

@app.route('/logout')
def logout():
    session.pop('user',None)
    return redirect('/')

def sumSessionCounter():
  try:
    session['counter'] += 1
  except KeyError:
    session['counter'] = 1    

@app.route('/dsignup',methods=['POST','GET'])
def driversignUp():
    try:
        _dfname = request.form['inputfName']
        _dlname = request.form['inputlName'] 
        _duname = request.form['inputuName']
        _duaddress = request.form['inputuaddress']
        _duphone = request.form['inputphone']
        _demail = request.form['inputEmail']
        _dpassword = request.form['inputPassword']
        _dcarmake =request.form['uTruck']
        _dcarlicence=request.form['uPlate']
        _dlicence=request.form['ulicence']
        # validate the received values
                                  # if _fname and _email and _password and _lname and _uname and _uaddress and _uphone :
                                   #   return json.dumps({'html':'<span>All fields good !!</span>'})
                                   #else:
                                   #  return json.dumps({'html':'<span>Enter the required fields</span>'})
        if _dfname and _demail and _dpassword and _dlname and _duname and _duaddress and _duphone :
              
       
            # All Good, let's call MySQL
         
            conn = mysql.connect()
            cursor = conn.cursor()
            #_hashed_password = generate_password_hash(_password)
            cursor.callproc('sp_createUser2',(_dfname,_dlname,_duname,_duaddress,_duphone,_dlicence,_dcarmake,_dcarlicence, _dpassword,_demail))
            data = cursor.fetchall()
            
            if len(data) is 0:
                conn.commit()
                #return json.dumps({'message':'User created successfully !'})
                session['user'] = _duname
                return render_template('driverpage.html')
            else:
                return json.dumps({'error':str(data[0])})
        else:
            return json.dumps({'html':'<span>Enter the required fields</span>'})

    except Exception as e:
        return json.dumps({'error':str(e)})
    finally:
        cursor.close() 
        conn.close()

@app.route('/validateLogin1',methods=['POST'])
def validateLogin1():
    try:
        dusername = request.form['inputuName']
        dpassword = request.form['inputPassword']
 
        #_hashed_password = generate_password_hash(_password)
        
 
        # connect to mysql
 
        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('sp_validateLogin1',(dusername,))

        data = cursor.fetchall()
        #flash('sd')
      
 
 
 
        if len(data) > 0:
            if str(data[0][10]) == dpassword :
                session['user'] = data[0][3]
                return redirect('/driverhome')
            else:
                return render_template('error.html',error = str(data[0][9]))
                #str(data[0][6])
        else:
            return render_template('error.html',error = 'Wrong Email address or Password.')
 
 
    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()
        
 
@app.route('/bookloc',methods=['POST','GET'])
def bookloc():
    try:
        # dlat = request.form['lat1']
        # dlng = request.form['lat2']
        # duser=session.get('user')
        #_hashed_password = generate_password_hash(_password)
        
 
        # connect to mysql
 
        con = mysql.connect()
        cursor = con.cursor()
        #cursor.callproc('sp_updatedr',(duser,dlat,dlng,))
        queryu="select * from booking_detail;"
        cursor.execute(queryu) 
        data = cursor.fetchall()
        #flash('sd')
        
        if len(data) > 0:
        	con.commit;
        	return json.dumps(data)
        	#return render_template('error.html',error=str(data))    

        else:
             return render_template('error.html',error=str(data))
 
        
 
 
    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()       


if __name__ == "__main__":
    app.run(debug=True,port=5002)


