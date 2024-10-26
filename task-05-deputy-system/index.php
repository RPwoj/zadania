<?php

/*
1. Osoby uczestniczące

- dyrektor
- zastepca dyrektora
- kierownik
- zastepca kierownika

*/


/* 2. fragment kodu php z logiką zastępstwa */

date_default_timezone_set('Europe/Warsaw');


/* sending the document to the right person */

function sendDocument($documentID, $userID) {
    
    if (checkIfUserIsPresent($userID)) {
        /* send document with id = $documentID to user with id = $userID */
    } else {
        $deputyUserID = getDeputy($userID);
        /* send document with id = $documentID to deputy user with id = $deputyUserID */
    }
}

function checkIfUserIsPresent($userID) {
    $currentDate = date('Y-m-d');

    if ($userID) {
        $result = $mysqli->query("SELECT * FROM absence_calendar WHERE date = $currentDate AND user_id = $userID");
    } else {
        return false;
    }
    
    return $result->num_rows > 0;
}

function getDeputy($userID) {
    $result = $mysqli->query("SELECT deputy FROM emplyers WHERE id = $userID");
    $row = $result->fetch_assoc();
    $deputyID = $row['deputy'];

    return $deputyID;
}



/* acceptance by manager or deputy manager */

function acceptDocument($documentID, $userID) {
    $userRole = getUserRole($userID);
    $directorID = 1;

    switch ($userRole) {
        case 'manager':
            $result = $mysqli->query("UPDATE documents SET accepted_by = $user_id WHERE id = $documentID");
            sendDocument($documentID, $directorID);
            break;
        case 'director':
            $result = $mysqli->query("UPDATE documents SET approved_by = $user_id WHERE id = $documentID");
            break;
    }
}



/* check if user is director or manager */

function getUserRole($userID) {
    $result = $mysqli->query("SELECT employee_role FROM employers WHERE id = $userID");
    $row = $result->fetch_assoc();
    $role = $row['employee_role'];
    return $role;
}


/* 3. Fragment bazy danych  

Tabela documents

do odnotowania zastępstwa zasosowałbym 4 pola w tabeli
1. manager     - pole uzupełnia się w momencie wysłania do managera
2. director    - pole uzupełnia się po akceptacji dokumentu
3. accepted_by - pole przechowuje id osoby akceptującej
4. approved_by - pole przechowuje id osoby zatwierdzającej

(jeżeli id osoby akceptującej / zatwierdzającej różni się od osoby do której został wysłąny dokument w celu akceptacji / zatwierdzenia, wtedy znaczy, 
że miało miejsce zastępstwo i pozwala szybko zweryfikować osobę, która dokonałą akceptacji / zatwierdzenia)


Pola w tabeli:
manager     - int - not null
director    - int - not null
accepted_by - int
approved_by - int

*/