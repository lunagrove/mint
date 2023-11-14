import React from 'react';
import { useState } from "react";

const EditProfile = ( {profile} ) => {

    const [firstname, setFirstName] = useState(profile.firstname);
    const [lastname, setLastName] = useState(profile.lastname);
    const [phonenumber, setPhoneNumber] = useState(profile.phonenumber);
    const [location, setLocation] = useState(profile.location);
    const [linkedin, setLinkedIn] = useState(profile.linkedin);
    const [website, setWebsite] = useState(profile.website);

    const [error, setError] = useState("");

    return (
        <form>
            <h6 className="form-label">Email</h6>
            <input type="email"
                  id="email"
                  className="form-input"
                  name="email"
                  value={profile.emailaddress}
                  readOnly />
            {error &&
              <div className="error">
                {error}
              </div>}
            <h6 className="form-label">First name</h6>
            <input type="text"
                  id="firstname"
                  className="form-input"
                  name="firstname"
                  value={firstname ? firstname : ""}
                  onChange={(event) => setFirstName(event.target.value)} />
            <h6 className="form-label">Last name</h6>
            <input type="text"
                  id="lastname"
                  className="form-input"
                  name="lastname"
                  value={lastname ? lastname : ""}
                  onChange={(event) => setLastName(event.target.value)} />
            <h6 className="form-label">Phone number</h6>
            <input type="text"
                  id="phonenumber"
                  className="form-input"
                  name="phonenumber"
                  value={phonenumber ? phonenumber : ""}
                  onChange={(event) => setPhoneNumber(event.target.value)} />
            <h6 className="form-label">Location</h6>
            <input type="text"
                  id="location"
                  className="form-input"
                  name="location"
                  value={location ? location : ""}
                  onChange={(event) => setLocation(event.target.value)} />
            <h6 className="form-label">LinkedIn</h6>
            <input type="text"
                  id="linkedin"
                  className="form-input"
                  name="linkedin"
                  value={linkedin ? linkedin : ""}
                  onChange={(event) => setLinkedIn(event.target.value)} />
            <h6 className="form-label">Website</h6>
            <input type="text"
                  id="website"
                  className="form-input"
                  name="website"
                  value={website ? website : ""}
                  onChange={(event) => setWebsite(event.target.value)} />
        </form>
    );
};

export default EditProfile;