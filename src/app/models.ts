export class Admin_model {
    a_id!: number;
    a_username!: string;
    a_password!: string;
    a_confirmpassword!: string;
    a_typeadmin!: number;
    a_typesuperadmin!: number;
    a_typesupersuperadmin!: number;
    a_name!: string;
    a_contactno!: string;
    a_message!: string;
    a_files!: File;
}

export class Visitor_model {
    v_id!: number;
    v_name!: string;
    v_contactno!: string;
    v_birthdate!: string;
    v_votingno!: string;
    v_address!: string;
    v_area!: string;
    v_problem!: string;
    v_otherproblem!: string;
    v_arja!: File;
    v_date!: string;
    completion_date!: string;
    v_comment!: string;
    v_status!: string;
    office!: string;
}