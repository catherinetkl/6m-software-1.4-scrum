/*
    Create a class "Document" that extends "Permission". In the Document class,

    - there should be a constructor that takes in 3 arguments:
        1. role (pass to parent constructor using "super")
        2. operation (pass to parent constructor using "super")
        3. content (store in private variable)
    - there should be a function "process()" that calls "check()" function declared in the Permission class.

    Instantiate from the Document class to create an object that calls "process()" with the following output:
    Scenario 1:
        const d = new Document(Permission.RolesConst.EDITOR, Permission.OperationsConst.UPDATE, "Hello content")
        d.process(); // "Allowed"
    Scenario 2:
        const d = new Document(Permission.RolesConst.READER, Permission.OperationsConst.UPDATE, "Hello content")
        d.process(); // "Blocked"
    Scenario 3:
        const d = new Document(Permission.RolesConst.OWNER, Permission.OperationsConst.DELETE, "Hello content")
        d.process(); // "Allowed"
*/
class Permission{
    // Define the static constants OperationsConst and RolesConst.
    // These are static constants that show what are the possible values when checking permission.
    static OperationsConst = {
        CREATE:"CREATE",
        READ:"READ",
        UPDATE:"UPDATE",
        DELETE:"DELETE"
    }
    static RolesConst = {
        OWNER:"OWNER",
        EDITOR:"EDITOR",
        READER:"READER"
    }
    // Define private variables #role and #operation
    #role;
    #operation;

    // Define the constructor to set the #role and #operation
    constructor(role, operation){
        if(this.constructor.name === "Permission"){
            throw new Error("This class cannot be instantiated");
        }
        this.#role = role;
        this.#operation = operation
    }

    // Define the check() method/function in the Permission class
    check(){
        // Convert operation to uppercase
        const ops = this.#operation.toUpperCase();

        /* Use switch to handle different roles and operations
         Return true or false based on conditions */
        switch(this.#role.toUpperCase()){
            case Permission.RolesConst.OWNER:
                return true;
            case Permission.RolesConst.EDITOR:
                if(ops === Permission.OperationsConst.READ || ops === Permission.OperationsConst.CREATE || ops === Permission.OperationsConst.UPDATE){
                    return true;
                }
                return false;
            case Permission.RolesConst.READER:
                if(ops === Permission.OperationsConst.READ){
                    return true;
                }
                return false;
            default:
                return false;

        }
    }
}
// Document is a child class of Permission
class Document extends Permission{
  #content; // private field
  // Define the constructor that takes role, operation, and content as arguments
  constructor(role, operation, content){
    // Call the parent class's constructor using super(role, operation)
    super(role, operation);
    /* Store content in a private variable
    bec Private field '#num' must be declared in an enclosing class */
    this.#content = content;
  }
  process(){
    // Call the inherited check() method
    const isAllowed = this.check();

    // Print "Allowed" or "Blocked" based on the check() result
    if (isAllowed) {
      console.log("Allowed");
    } else {
      console.log("Blocked");
    }
  }
}
let d1 = new Document(Permission.RolesConst.EDITOR, Permission.OperationsConst.UPDATE, "Hello content"); // Create object d1 from Document(Permission.RolesConst.EDITOR, Permission.OperationsConst.UPDATE, "Hello content")
d1.process(); // Call d1.process()

let d2 = new Document(Permission.RolesConst.READER, Permission.OperationsConst.UPDATE, "Hello content"); // Create object d2 from Document(Permission.RolesConst.READER, Permission.OperationsConst.UPDATE, "Hello content")
d2.process(); // Call d2.process()

let d3 = new Document(Permission.RolesConst.OWNER, Permission.OperationsConst.DELETE, "Hello content"); // Create object d3 from Document(Permission.RolesConst.OWNER, Permission.OperationsConst.DELETE, "Hello content")
d3.process(); // Call d3.process()
