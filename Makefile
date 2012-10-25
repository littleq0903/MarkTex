SRC_FOLDER="./yeoman_src"

run:
	tibuild.py -d . -r .

build:
	tibuild.py --appstore -t bundle -v -d ~/Desktop .
