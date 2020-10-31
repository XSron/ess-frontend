import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})

export class ReceiptComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public openPDF(htmlData): void {
    html2canvas(htmlData, { allowTaint: true })
      .then(canvas => {
        const htmlWidth = canvas.width;
        const htmlHeight = canvas.height;
        const topLeftMargin = 15;
        const pdfWidth = htmlWidth + (topLeftMargin * 2);
        const pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);
        const canvasImageWidth = htmlWidth;
        const canvasImageHeight = htmlHeight;
        const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;
        canvas.getContext('2d');
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, canvasImageHeight);
        for (let i = 1; i <= totalPDFPages; i++) {
          pdf.addPage([pdfWidth, pdfHeight], 'p');
          pdf.addImage(imgData, 'JPG', topLeftMargin, -(pdfHeight * i) + (topLeftMargin * 4), canvasImageWidth, canvasImageHeight);
        }
        pdf.save('ESS-Receipt.pdf');
      });
  }

  public goBack(): void {
    this.location.back();
  }

}
