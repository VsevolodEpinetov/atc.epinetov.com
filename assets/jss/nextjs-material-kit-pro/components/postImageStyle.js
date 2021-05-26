/*

.article-image-wrapper {
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 30px;
}

.article-image-description {
  font-size: 0.9rem !important;
  text-align: center;
  margin-top: 5px !important;
  margin-bottom: 0px !important;
}

.article-image {
  width: 100% !important;
}
  
*/

const postImageStyle = theme => ({
  wrapper: {
    width: '100%',
    border: '1px solid #ececec',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '30px'
  },
  description: {
    fontSize: '0.9rem !important',
    textAlign: 'center',
    marginTop: '5px !important',
    marginBottom: '0px !important'
  }
});

export default postImageStyle;
