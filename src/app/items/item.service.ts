import { Injectable } from '@angular/core';
import { Contact } from './item';
import { Http, Response } from '@angular/http';

@Injectable()
export class ContactService {
    private contactsUrl = '/api/item';

    constructor (private http: Http) {}

    // get("/api/item")
    getContacts(): Promise<void | Contact[]> {
      return this.http.get(this.contactsUrl)
                 .toPromise()
                 .then(response => response.json() as Contact[])
                 .catch(this.handleError);
    }

    // post("/api/item")
    createContact(newContact: Contact): Promise<void | Contact> {
      return this.http.post(this.contactsUrl, newContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    // get("/api/item/:id") endpoint not used by Angular app

    // delete("/api/item/:id")
    deleteContact(delContactId: String): Promise<void | String> {
      return this.http.delete(this.contactsUrl + '/' + delContactId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/item/:id")
    updateContact(putContact: Contact): Promise<void | Contact> {
      var putUrl = this.contactsUrl + '/' + putContact._id;
      return this.http.put(putUrl, putContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}