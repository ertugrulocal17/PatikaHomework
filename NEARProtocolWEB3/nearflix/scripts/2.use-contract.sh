#!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$CONTRACT" ] || echo "Found it! \$CONTRACT is set to [ $CONTRACT ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'call' functions on the contract"
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo
echo "Try to create User account without name. // Errorr no name"
echo
near call $CONTRACT newUser '{"name":""}' --accountId <'YOUR-TESTNET-NAME'> --amount 1
echo
echo "Try to create User account without --amount. // Errorr no amount attached"
echo
near call $CONTRACT newUser '{"name":"lal"}' --accountId <'YOUR-TESTNET-NAME'>
echo
echo "Try to create User account Successfully"
echo
near call $CONTRACT newUser '{"name":"lal"}' --accountId <'YOUR-TESTNET-NAME'> --amount 1
echo
echo ---------------------------------------------------------
echo "Step 2: Call 'call' functions on the contract to login User"
echo
echo ---------------------------------------------------------
echo 
echo "Try to login with wrong User ID. //Errorr Not Registered."
echo
near call $CONTRACT userLogin '{"userId":###@}' --accountId <'YOUR-TESTNET-NAME'>
echo
echo "Try to login with Registered User ID. //Successfull"
echo
near call $CONTRACT userLogin '{"userId":###}' --accountId <'YOUR-TESTNET-NAME'>
echo
echo ---------------------------------------------------------
echo "Step 3: Call 'view' functions on the contract to View Users"
echo
echo ---------------------------------------------------------
echo 
echo "View All Users."
near view $CONTRACT usersList
echo
echo ---------------------------------------------------------
echo "Step 4: Call 'call' functions on the contract delete User with User ID."
echo
echo ---------------------------------------------------------
echo 
echo "Delete User with ID."
echo
near call $CONTRACT deleteUser '{"userId":###}' --accountId l<'YOUR-TESTNET-NAME'>
echo
echo "Try to Login with deleted User ID. //Failed No User Found"
echo
near call $CONTRACT userLogin '{"userId":##}' --accountId <'YOUR-TESTNET-NAME'>
echo
echo "now run this script again to see changes made by this file"
exit 0
