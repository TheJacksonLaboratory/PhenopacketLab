import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  contacts: Contact[] =
      [
        {name: 'Peter Robinson M.D., MSc.', title: 'Professor of Computational Biology',
            external_link: 'https://www.jax.org/research-and-faculty/faculty/peter-robinson',
            email: 'peter.robinson@jax.org', src: 'assets/img/peter-robinson.jpeg'},
        {name: 'Daniel Danis Ph.D.', title: 'Associate Computational Scientist',
            external_link: 'https://www.jax.org/people/daniel-danis',
            email: 'daniel.danis@jax.org', src: 'assets/img/daniel-danis.jpeg'},
        {name: 'Michael Gargano M.S.', title: 'Senior Scientific Software Engineer',
            external_link: 'https://www.jax.org/people/michael-gargano',
            email: 'michael.gargano@jax.org', src: 'assets/img/michael-gargano.jpeg'},
        {name: 'Baha El Kassaby MSc.', title: 'Senior Scientific Software Engineer',
            external_link: 'https://www.jax.org/people/baha-el-kassaby',
            email: 'Baha.ElKassaby@jax.org', src: 'assets/img/baha-el-kassaby.jpeg'},
        {name: 'Beth Sundberg', title: 'Scientific QA Software Engineer',
              external_link: 'https://www.jax.org/people/beth-sundberg',
              email: 'beth.sundberg@jax.org', src: 'assets/img/beth-sundberg.jpeg'},
        {name: 'Camille Liedtka M.S.', title: 'Associate Research Project Manager',
              external_link: 'https://www.jax.org/people/camille-liedtka',
              email: 'camille.liedtka@jax.org', src: 'assets/img/camille-liedtka.jpeg'}
      ];
  constructor() {
  }

  ngOnInit() {
  }

}
