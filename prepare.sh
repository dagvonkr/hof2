#!/bin/bash
cd hof2
rm -fr ./bundle
tar -xzf source.tar.gz
#cd bundle/server
#npm install fibers
cd bundle/programs/server
#npm install fibers@1.0.9
npm install