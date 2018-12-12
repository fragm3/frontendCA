import React from "react";
import PropTypes from "prop-types";
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
/* 
 * Simple editor component that takes placeholder text as a prop 
 */

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    // this.handleChange = this.handleChange.bind(this)
  }
  
    

  render () {
    return (
        <div name={this.props.name}>
          <ReactQuill 
          className="editor"
          theme={this.state.theme}
          onChange={this.props.triggerUpdate}
          value={this.props.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
         />
    </div>
        )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],

    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
}

/* 
 * Render component on page
 */
export default (Editor);

// const editor_options = {
//   theme: 'snow',
//   modules: {
//       toolbar: {
//           container: [['bold', 'italic', 'underline', 'strike'], ['link', 'image', 'video']],
//           handlers: { image: quill_img_handler },
//       },
//   },
// };

// function quill_img_handler() {
//   let fileInput = this.container.querySelector('input.ql-image[type=file]');

//   if (fileInput == null) {
//       fileInput = document.createElement('input');
//       fileInput.setAttribute('type', 'file');
//       fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
//       fileInput.classList.add('ql-image');
//       fileInput.addEventListener('change', () => {
//           const files = fileInput.files;
//           const range = this.quill.getSelection(true);

//           if (!files || !files.length) {
//               console.log('No files selected');
//               return;
//           }

//           const formData = new FormData();
//           formData.append('file', files[0]);

//           this.quill.enable(false);

//           axios
//               .post('/api/image', formData)
//               .then(response => {
//                   this.quill.enable(true);
//                   this.quill.editor.insertEmbed(range.index, 'image', response.data.url_path);
//                   this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
//                   fileInput.value = '';
//               })
//               .catch(error => {
//                   console.log('quill image upload failed');
//                   console.log(error);
//                   this.quill.enable(true);
//               });
//       });
//       this.container.appendChild(fileInput);
//   }
//   fileInput.click();
// }