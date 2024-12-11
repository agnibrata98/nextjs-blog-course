// for creating student interface
export interface IcreateStudentProps {
    success: boolean;
    msg: string;
      _id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      class: string;
    
  }

  export interface createStudentProps extends IcreateStudentProps {
    data: IcreateStudentProps;
  }

  // for showing all student interface
  export interface IshowAllStudentProps {
    ststus: string;
    totalStudent: number;
    data: [
      {
        _id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        class: string;
      }
    ]
}

export interface showAllStudentProps extends IshowAllStudentProps {
    data: IshowAllStudentProps['data'];
}

// for editing student interface
export interface IstudentDetailsProps {
    _id: string;
    name: string;   
    email: string;
    phone: string;
    address: string;
    city: string;
    class: string;
}
export interface studentDetailsProps extends IstudentDetailsProps {
    data: IstudentDetailsProps;
}

// for updating student interface
export interface IupdateStudentProps {
      _id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      class: string;
      message: string;
}
export interface updateStudentProps extends IupdateStudentProps {
    data: IupdateStudentProps;
}

// for deleting student interface
export interface IdeleteStudentProps {
    _id: string;
    message: string;
    status: boolean;
}
export interface deleteStudentProps extends IdeleteStudentProps {
    data: IdeleteStudentProps;
}