@echo off

for /f "usebackq tokens=1,2 delims==" %%a in (".env") do (
    set "%%a=%%b"
)

:waitloop
mysqladmin ping -h 127.0.0.1 -P %DBPORT% -u %DBUSERNAME% -p%DBPASSWORD% >nul 2>&1
IF ERRORLEVEL 1 (
    echo Waiting for DB on port %DBPORT%
    timeout /t 2 >nul
    GOTO waitloop
)

echo Database is connected...
call node ./patches/patches.js

echo Starting VScode....
call code .

echo Starting dev server...
:: pm2 startOrRestart ./configuration/ecosystem.config.cjs
nodemon server.js