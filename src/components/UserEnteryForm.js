import React, { useState, useEffect } from "react";
import { navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UserEnteryForm() {
  const { formType, id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  console.log("form type .if gate...", formType, "", id);

  const submitForm = (e) => {
    e.preventDefault();
    let requestBody;
    //if need to update form data then calling put method otherwise post method to add
    if (formType == "edit") {
      requestBody = {
        name: name,
        email: email,
        phone: phone,
      };

      console.log("request body-----", requestBody);
      axios
        .put(`http://localhost:4444/employe/${id}`, requestBody)
        .then((Response) => {
          console.log("response when form submit aftr edit", Response);
          navigate("/userlist");
        })
        .catch((Error) => {
          console.log("error not submit form", Error);
        });
    } else {
      requestBody = {
        name: name,
        email: email,
        phone: phone,
      };
      console.log("request body ....", requestBody);
      //adding fresh data with post method
      axios
        .post("http://localhost:4444/employe", requestBody)
        .then((Response) => {
          console.log("response of form submit", Response);
          navigate("/userlist");
        })
        .catch((Error) => {
          console.log("error.....", Error);
        });
    }
  };

  //   useEffect Always run 1st
  useEffect(() => {
    if (formType == "edit") {
      fetchUser();
    }
  }, []);

  function fetchUser() {
    axios
      .get(`http://localhost:4444/employe/${id}`)
      .then((Response) => {
        console.log("response", Response);
        setName(Response?.data?.name);
        setEmail(Response?.data?.email);
        setPhone(Response?.data?.phone);
      })
      .catch((Error) => {
        console.log("error", Error);
      });
  }

  return (
    <React.Fragment>
      <div className="p-16 rounded border border-gray-200 bg-blue-50 w-1/3 mx-auto mt-20 shadow-lg">
        <h1 className="font-medium text-4xl">View UserDetails</h1>
        <form action="" onSubmit={submitForm}>
          <div className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-2xl text-gray-700 block mb-1 font-semibold float-left mx-4 my-4"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="bg-white h-12 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-2xl text-gray-700 block mb-1 font-semibold float-left mx-4 my-4"
              >
                Email Adress
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                name="email"
                id="email"
                className="bg-white h-12 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="text-2xl text-gray-700 block mb-1 font-semibold float-left mx-4 my-4"
              >
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="phone"
                name="phone"
                id="phone"
                className="bg-white h-12 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Phone no."
              />
            </div>
          </div>

          <div className="space-x-4 mt-8">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default UserEnteryForm;
