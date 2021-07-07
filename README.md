# Cocktail Warehouse


## IST-Analyse
- Es gibt viele Applikationen die Sammlungen von Cocktails anbieten, aber keine die erlaubt eigene Cocktails zu speichern und zu verwalten
    * mann könnte auch Gerichte speichern und verwalten

## SOLL-Konzept
- Eine Applikation erstellen, die speichern und verwaltung von Cocktails und gerichten erlaubt
- User soll sich einlogen um auf seine Sammlung zuzugreifen
- Must have
    * Sign in
    * Create new Account
    * Sammlung:
        * Speichern
        * Ändern
        * Löschen
        * Abfragen (bestehende Sammlung) - Mit Filtern!! Zeigt mir alle cocktails mit zutat X an..
        * Abfragen (nur einen Produkt aus der Sammlung)
    * Sammlung mit Suche eingabe
    * Fotos vom Cocktail/Gericht zu machen und mitabzuspeichern
    * Autocomplete funktion ?? - Muss nicht sein
    * Sammlung Public oder Privat setzten können
    * Liste mit öffentlichen Cocktails
    * Sammlung mit anderen Usern teilen
- Should to have
    * Sich mit anderem User verlinken, um seine Sammlungen zu sehen
    * Bewerten von andere Sammlungen
 


## Zeitplanung
- Projekt Start am 12.2.2020
- Projekt muss am 9.4.2021 fertig sein
- Milestones
    * 12.02.2021
    * 26.02.2021
    * 12.03.2021
    * 26.03.2021
    * 09.04.2021

## Verwendete externe Module im Backend

- Express JS
- MongoDB
- Mongoose
- JWT - JSON Web Token
- bcryptjs
- cloudinary
- cors
- dotenv
- fs-extra
- multer


## Verwendete externe Module im Frontend

- react
- react-dom
- react-icons
- react-notifications-component
- react-router-dom
- jquery
- @material-ui/core
- @material-ui/icons


## Erklärung Applikation.

- Sign In & Sign Up
    * User muss sich mit username und password registrieren.   
        * Beim Sign Up wird geprüft ob der User schon im MongoDB existiert (Da username unique sein muss) und wenn nicht, wird einen neuen angelegt
        * Beim Sign In wird username und password (zuerst wird diese gehashed und dann vergleicht) geprüft und wenn es überein stimmt, dann angemeldet
- Cocktail Sammlung
    * Bei neuer User bzw. noch keinen Cocktail gespeichert
        * Wenn man angemeldet ist aber noch keinen Cocktail gespeichert hat, wird in den Bildschirm erklärt, wie die Applikation funktioniert + 3 Buttons (Log Out, Connect und Cocktail speichern). Sobald einen Cocktail gespeichert wird, geht diese 
    * Bei bestehende Sammlung
        * Es werden im Accordion Modus die Cocktails angezeit
        * Bei jeder Cocktail gibt es einen Namen, eine Foto, Ingredients, eine Description wie der Cocktail gemacht wird und 2 buttons (Delete und Edit)
        * Mann kann bei der Search eingabe Cocktails per Ingredients suchen
        * Es gibt einen Rating system mit Sterne. Wenn man auf diese clickt, wird eine put anfragen an den Server geschickt und den Cocktail wird mit den neuen Rating gespeichert.
    * Cocktail speichern
        * Wenn man auf den Button 'Add Cocktail' clickt, gelingt man auf eine andere Seite mit einen Formular wo folgendes eingegeben werden muss:
            * Name vom Cocktail
            * Foto vom Cocktail (Wird in Cloudinary gespeichert. Im MondoDB wird nur die Adresse gespeichert)
            * Ingredients vom Cocktail
            * Zubereitungsmethode vom Cocktail
        * Bei click auf 'save', wird eine post anfrage an den Server geschickt und den Cocktail wird gespeichert
    * Cocktail bearbeiten
        * Wenn den Cocktail gespeichert ist, gibt es einen Button 'edit' um diesen zu editieren:
            * Die werte Namen, Ingredients und Zubereitungsmethode  sind die selben was den Cocktail hatte. Wenn etwas geändert wird und bei 'save' clicken, wird eine put anfrage an den Server geschickt und den Cocktail wird mit den neuen Wert gespeichert und die Werte, die nicht geändert wurden, bleiben gleich wie davor
    * Cocktail Löschen
        * Wenn den Cocktail gespeichert ist, gibt es einen Button 'delete' um diesen zu löschen:
            * es wird eine delete anfrage an den Server gechickt und dieser Cocktail wird gelöscht. Das Foto vom Cloudinary wird genauso gelöscht
- Verbinden
    * Connect
        * Mann kann sich mit anderen Users verbinden (nur mit einen einzelnen jedes mal) und seine Sammlung anschauen und bewerten
        * Beim verbinden muss man den Username vom User eingeben um sich mit ihm verbinden zu können. Bei seiner Sammlung kann man nichts machen außer diese sehen
    * Disconnect
        * Wenn man mit einen User verbunden ist, der Button was davor zu connection gedient hat, ist jetzt zur Disconnection da.
        * Um wieder auf seinee Sammlung zu kommen muss man sich disconnecten oder ausloggen
    * Ausloggen
        * Es gibt einen Button um sich auszuloggen
        * Dadurch wird auch der User getrennt mit anderen User, falls er mit ein anderen User verbunden war 

