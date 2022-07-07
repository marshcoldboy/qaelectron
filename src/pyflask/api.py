from __future__ import print_function
from flask import Flask
from calc import calc
from flask_cors import CORS
from flask_restx import Api, Resource, reqparse

API_VERSION = "1.1.0"

app = Flask(__name__)
CORS(app)
api = Api(
    app,
    version=API_VERSION,
    title="Flask backend api",
    description="The backend api system for the Electron Vue app",
    doc="/docs",
)


@api.route("/api_version", endpoint="apiVersion")
class ApiVersion(Resource):
    def get(self):
        return API_VERSION


@api.route("/echo", endpoint="echo")
class HelloWorld(Resource):
    @api.response(200, "Success")
    @api.response(400, "Validation Error")
    def get(self):
        return "Server active!!"


# Request parser documentation can be found here: https://flask-restx.readthedocs.io/en/latest/parsing.html

calculator = api.namespace("calculator", description="Calculator operations")


@calculator.route("/add", endpoint="addition")
class Add(Resource):
    @calculator.doc(
        responses={200: "Success", 400: "Validation error"},
        params={"expression": "Formula to compute"},
    )
    def post(self):
        """Takes in an arithmetic expression and returns the result"""
        parser = reqparse.RequestParser()
        parser.add_argument(
            "expression",
            type=str,
            required=True,
            help="Expression is required. Expression needs to be of type str",
        )

        # Use this to add parameters to extract from the request object. Any fields not explicitly stated in the parser will be ignored
        # parser.add_argument('name')

        args = parser.parse_args()
        formula = args["expression"]
        # restx will automatically jsonify dictionaries. You don't need to import the jsonify method from flask
        return str(calc(formula))


# 5000 is the flask default port. You can change it to something else if you want.
# Remove `debug=True` when creating the standalone pyinstaller file
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
    # app.run(host="127.0.0.1", port=5000, debug=True)
