import os

from flask import Flask, flash, redirect, render_template, request, session

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/", methods=["GET", "POST"])
def index():
    """"Fill out form"""
    if request.method == "POST":
        length = request.form.get("length")
        mc_count = request.form.get("mc_count")
        typet = request.form.get("typet")

        replace_length = length.replace(".", "1", 1)

        if not length or replace_length.isdigit() is False:
            sorry = "You didn't enter an exam length"
            return render_template("sorry.html", sorry=sorry)
            
        if not mc_count or mc_count.isdigit() is False:
            sorry = "You didn't enter a number"
            return render_template("sorry.html", sorry=sorry)
            
        if (typet == 'manual'):
            return render_template("fancytimer.html", length=length, mc_count=mc_count)
        else:
            return render_template("regulartimer.html", length=length, mc_count=mc_count)
    else:
        return render_template("index.html")

@app.route("/sorry", methods=["GET", "POST"])
def sorry():
    if request.method == "POST":
        return redirect("/")
    else:
        return render_template("sorry.html")