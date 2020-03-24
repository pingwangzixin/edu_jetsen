import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
    install(Vue, options) {
        Vue.prototype.getPdf = function (a) {
            var title = this.htmlTitle
            html2Canvas(document.querySelector(a), {
                allowTaint: true,
                useCORS:true
            }).then(function (canvas) {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
                let imgWidth = 595.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                let PDF = new JsPDF('', 'pt', [imgWidth,imgHeight])
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                PDF.save(title + '.pdf')
            })
        }
    }

}  
