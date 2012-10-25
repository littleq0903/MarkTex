
run:
	tibuild.py -d . -r .

build:
	tibuild.py --appstore -t bundle -v -d ~/Desktop .

clean:
	rm -rf *.app
