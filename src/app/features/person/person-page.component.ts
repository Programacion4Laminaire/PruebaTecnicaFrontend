import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Person, PersonFilter } from './person.model';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './person-page.component.html',
  styleUrl: './person-page.component.scss',
})
export class PersonPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly personService = inject(PersonService);

  persons: Person[] = [];
  isLoading = false;
  errorMessage = '';

  filterForm: FormGroup;
  personForm: FormGroup;

  constructor() {
    // 👉 PARA EL EXAMEN: puedes pedir que agreguen más validaciones
    this.filterForm = this.fb.group({
      identification: [''],
      firstName: [''],
      lastName: [''],
    });

    this.personForm = this.fb.group({
      identification: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const filter: PersonFilter = this.filterForm.value;

    this.personService.getPersons(filter).subscribe({
      next: (persons) => {
        this.persons = persons;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al cargar las personas.';
        this.isLoading = false;
      },
    });
  }

  onSearch(): void {
    this.loadPersons();
  }

  onResetFilters(): void {
    this.filterForm.reset();
    this.loadPersons();
  }

  onCreate(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const person: Person = this.personForm.value;

    this.personService.createPerson(person).subscribe({
      next: () => {
        this.personForm.reset();
        this.loadPersons();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error al crear la persona.';
        this.isLoading = false;
      },
    });
  }
}
