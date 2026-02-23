from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import requests
import json


# Create your views here.

#User login and registration view
def user(request):

    #METHOD VERIFICATION CODE
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)
    if request.body:
        data = json.loads(request.body)
    else:
       data = {}
    
    user_sel = data.get("action")

    if user_sel == "login":
        #LOGIN LOGIC HERE
        Login = True
        if Login:
            return JsonResponse({"message": "Login successful", "status": "Successful"})
        else:
            return JsonResponse({"message": "Login unsuccessful", "status": "Unsuccessful"})
    
    elif user_sel == "register":
        #REGISTERATION LOGIC HERE
        register = True
        if register:
            return JsonResponse({"message": "Resgisteration successful", "status": "Successful"})
        else:
            return JsonResponse({"message":"Registration Failed", "status": "Unsuccessful"})
    
    else:
        return JsonResponse({"message: ": "Invalid action"}, status=400)

#User password management view
def password(request):
    data = json.loads(request.body)

    user_sel = data.get("action")

    if user_sel == "forgot_password":
        forgot_password = True
        if forgot_password:
            return JsonResponse({"message": "Password reset link sent to your email", "status": "Successful"})
        else:
            return JsonResponse({"message": "Failed to send password reset link", "status": "Unsuccessful"})
    
    elif user_sel == "reset_password":
        reset_password = True
        if reset_password:
            return JsonResponse({"message": "Password reset successful", "status": "Successful"})
        else:
            return JsonResponse({"message": "Password reset failed", "status": "Unsuccessful"})
    
    else:
        return JsonResponse({"message: ": "Invalid action"}, status=400)

