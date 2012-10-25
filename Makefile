
run:
	tibuild.py -d /tmp -r .

build:
	tibuild.py --appstore -t bundle -v -d ~/Desktop .

clean:
	rm -rf *.app
