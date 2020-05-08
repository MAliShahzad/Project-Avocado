// const fetch = require("node-fetch");
// const bcrypt = require("bcrypt");
import React from "react";

const rounds = 3;
fetchData = async (w) => {
  var response = await fetch("http://182.176.112.68:3000/" + w);
  response = await response.json();
  console.log(response);
  return await response;
};

// returns not user or invalid password or customer or freelancer as string
const validatelogin = async (email, password) => {
  // password = await bcrypt.hash(password, rounds);

  var params = ["login='" + email + "'"];
  params = { table: "U_SERS", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  params = await fetchData(params);
  params = params[0];

  if (email != params.login) {
    return "not user";
  } else if (password != params.secrets) {
    return "invalid password";
  } else if (password == params.secrets && email == params.login) {
    var role = [`id=${params.id}`];
    role = { table: "roles", item: "*", arr: role };
    role = JSON.stringify(role);
    role = "getlogin" + role;
    role = await fetchData(role);
    role = role[0];
    return role.name;
  }
};

//returns a list of all the tasks of a user with the email entered in the form
const getUserCurrentTasks = async (email) => {
  var params = ["login='" + email + "'"];
  params = { table: "U_SERS", item: "id", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  params = await fetchData(params);
  let iden = params[0].id;
  let role = [`id=${iden}`];
  role = { table: "roles", item: "*", arr: role };
  role = JSON.stringify(role);
  role = "getlogin" + role;
  role = await fetchData(role);
  role = role[0].name;
  if (role == "customer") {
    role = "buyer";
  }
  let curr_tasks = [`id=(SELECT id FROM ${role} WHERE user_id= ${iden} )`];
  curr_tasks = { table: "details", item: "name, status", arr: curr_tasks };
  curr_tasks = JSON.stringify(curr_tasks);
  curr_tasks = "gettask" + curr_tasks;
  curr_tasks = await fetchData(curr_tasks);
  console.log(curr_tasks);
};

const getFreelancerList = async (task_type) => {
  var params = [`category=\'${task_type}\'`];
  params = { table: "EXTRA_DATA", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  params = await fetchData(params);
  let idlist = [];
  params.forEach((w) => idlist.push(w.id));
  let query = `id=${idlist[0]}`;
  for (let index = 1; index < idlist.length; index++) {
    query += ` OR id=${idlist[index]}`;
  }
  query += " ORDER BY ratings DESC";

  query = [query];
  query = { table: "ratings", item: "*", arr: query };
  query = JSON.stringify(query);
  query = "getfreelancer" + query;
  query = await fetchData(query);
  params.forEach((w) => {
    for (let index = 0; index < query.length; index++) {
      if (query[index].id == w.id) {
        w.rating = query[index].ratings;
      }
    }
  });
  return params;
};

const getUserHistoryTasks = async (email) => {
  var params = ["login='" + email + "'"];
  params = { table: "U_SERS", item: "id", arr: params };
  params = JSON.stringify(params);
  params = "getlogin" + params;
  params = await fetchData(params);
  let iden = params[0].id;
  let role = [`id=${iden}`];
  role = { table: "roles", item: "*", arr: role };
  role = JSON.stringify(role);
  role = "getlogin" + role;
  role = await fetchData(role);
  role = role[0].name;
  if (role == "customer") {
    role = "buyer";
  }
  let hist_tasks = [`id= ${iden}`];
  hist_tasks = { table: "history", item: "task_id", arr: hist_tasks };
  console.log(hist_tasks);
  hist_tasks = JSON.stringify(hist_tasks);
  hist_tasks = "get" + role + hist_tasks;
  hist_tasks = await fetchData(hist_tasks);
  var idlist = [];
  hist_tasks.forEach((w) => idlist.push(w.task_id));

  let query = `id=${idlist[0]}`;
  for (let index = 1; index < idlist.length; index++) {
    query += ` OR id=${idlist[index]}`;
  }
  query = [query];

  query = { table: "details", item: "*", arr: query };
  query = JSON.stringify(query);
  query = "gettask" + query;
  query = await fetchData(query);

  console.log(query);
};

const getJobsList = async (task_type) => {
  var params = [`category=\'${task_type}\'`];
  params = { table: "details", item: "*", arr: params };
  params = JSON.stringify(params);
  params = "gettask" + params;
  params = await fetchData(params);
  console.log(params);
};
export const testfunc = () => {
  alert("asfasf");
};
export const validateSignup = async (
  name,
  email,
  password,
  repassword,
  role,
  category
) => {
  if (password != repassword) {
    return "Re-entered password wrong";
  }
  // password = await bcrypt.hash(password, rounds);
  var iden = 0;
  for (let index = 0; index < email.length; index++) {
    var num = email.charCodeAt(index);

    iden += Math.pow(num, 2);
  }

  var params = [password, email, iden];
  params = JSON.stringify(params);
  params = "insertuser" + params;
  params = await fetchData(params);

  params = [iden, role];
  params = JSON.stringify(params);
  params = "insertrole" + params;
  params = await fetchData(params);

  params = [iden, name, category, "", "", email];
  params = JSON.stringify(params);
  params = "insertextradetail" + params;
  params = await fetchData(params);

  return "Sign Up Successful";
};

(async (w, s) => {
  resp = await w;

  console.log(await resp);
})(
  validateSignup(
    "maroof",
    "mamdfdfcfsfdsfsfom",
    "qwerty",
    "qwerty",
    "customer",
    "Content Writing"
  )
);
