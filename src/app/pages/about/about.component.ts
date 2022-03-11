import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  boards = [
    {
      image: "../../../assets/images/nwosu.png",
      title: "Chairman",
      name: "Sir Sunday Nnamdi Nwosu",
      id: "0",
      about: "Sir Nnamdi Nwosu is a prominent Nigerian investor on the Nigerian Stock Exchange, member of audit committees of a number of listed companies on the exchange, and a non-executive director of RT Briscoe Plc ( where he is the Board Chairman), MRS Oil Plc, and Nahco Aviance Plc."
    },
    {
      image: "../../../assets/images/akinde.png",
      title: "Vice Chairman",
      name: "Dr. Joseph Akinsola Akinde, FWACS",
      id: "1",
      about: "Dr. Akinsola Akinde is a practicing consultant Gynaecologist and Obstetrician and a two-time president of the Lagos Chapter of the Society of Gynaecologist and Obstetrics of Nigeria (SOGON)."
    },
    {
      image: "../../../assets/images/abiodun.png",
      title: "Managing Director",
      name: "Mr. Abiodun Ayodele",
      id: "6",
      about: "Mr. Abiodun Ayodele is a member of chartered Insurance Institute of Nigeria and an experienced Business Strategist and entrepreneur with a list of successful businesses since graduation from university."
    },
    {
      image: "../../../assets/images/ezeigbo.png",
      title: "",
      name: "Prof. Adimora Akachi Ezeigbo",
      id: "2",
      about: "Professor Akachi Ezeigbo is currently the chairperson of the Panel of Judges for the annual Nigeria LNG Prize for Literature, and a past winner of the prestigious award. She is also a non-executive director of University Press Plc, Ibadan."
    },
    {
      image: "../../../assets/images/olusegun.png",
      title: "",
      name: "Arch. O. P. A. Ladega",
      id: "3",
      about: "Architect Ladega is a fellow of the Nigerian Institute of Architects and Managing Director of Interstate Architects Nigeria Limited. His many distinguished, breath-taking projects include the iconic Central Bank of Nigeria building in Abuja, the FCT."
    },
    {
      image: "../../../assets/images/ayodele.png",
      title: "",
      name: "Mr. Francis Olusegun Ayodele",
      id: "4",
      about: "Mr. Olusegun Ayodele has work experiences at the senior staff level of Unilever Plc, Multi-Grace projects and as Non-Executive Director of Home Comfort Ventures, based in Lagos"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
