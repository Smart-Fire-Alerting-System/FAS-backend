
<!-- # Table of Contents -->

<!-- - [Table of Contents](#table-of-contents) -->
- [Installation](#installation)
  - [Activate virtual environment](#activate-virtual-environment)
  - [Requirements](#requirements)
  - [Run](#run)
- [Usage](#usage)
  - [Registration (POST)](#registration-post)
  - [Login](#login)
  - [](#)

## Installation

```shell
git clone https://github.com/Smart-Fire-Alerting-System/DADN-backend.git
cd DADN-backend
```

### Activate virtual environment

To create venv,

```bash
python -m venv venv
```

To activate,

```bash
# in windows
.\venv\Scripts\Activate.ps1 

# linux based
source venv\bin\activate
```

### Requirements

Note: The *venv* must be activated before installing these requirements

```shell
pip install -r requirements.txt
```

### Run

For the first run, all models need to be migrated

```shell
python manage.py migrate
```

And then, run the server

```shell
python manage.py runserver
```

## Usage

Go to the link [http://localhost:8000/docs/](http://localhost:8000/docs/) to show project documentation

### Registration (POST)

API endpoint: [http://localhost:8000/api/rest-auth/registration](http://localhost:8000/api/rest-auth/registration)

### Login

API endpoint [http://localhost:8000/api/rest-auth/login](http://localhost:8000/api/rest-auth/login)

Login with the registered account is obligated in order to use other services

###
