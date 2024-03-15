import { Component } from '@angular/core';

interface Student {
  name: string;
  age: number;
  department: string;
  marks: number;
}

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent {
  studentData: Student[] = [
    { name: "Abhay", age: 18, department: "Computer Science", marks: 92 },
    { name: "Anand", age: 21, department: "Mechanical", marks: 43 },
    { name: "Varun", age: 23, department: "Electrical", marks: 42 },
    { name: "Beena", age: 18, department: "Civil", marks: 91 },
    { name: "Zendaya", age: 21, department: "Computer", marks: 73 },
    { name: "Cyril", age: 18, department: "Computer", marks: 98 },
    { name: "Sneha", age: 21, department: "Human Resource", marks: 80 },
    { name: "Sara", age: 23, department: "Electrical", marks: 20 },
   
  ];

  // Properties for sorting
  selectedField: string = 'name';
  sortDirection: number = 1;

  // Property for minimum marks input
  stud_mark: number | undefined;

  // Method to sort the students array based on selected field
  sortStudents(field: string): void {
    if (this.selectedField === field) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortDirection = 1;
    }
    this.selectedField = field;
    this.studentData.sort((a, b) => {
      // Type assertion to inform TypeScript that the properties accessed using 'field' exist on the 'Student' interface
      const aValue = (a as any)[field];
      const bValue = (b as any)[field];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection * aValue.localeCompare(bValue); // Use localeCompare for string comparison
      } else {
        return this.sortDirection * (aValue - bValue);
      }
    });
  }

  // Method to filter students with marks greater than the given mark
filterStudents(): void {
  if (this.stud_mark !== undefined) {
    const minMarks = this.stud_mark;
    this.studentData = this.studentData.filter(student => student.marks > minMarks);
    this.sortStudents(this.selectedField); // Sort the filtered data again
  }
}
}
