import React, { Component } from "react";
import styles from "../styles/Home.module.css";
import html2canvas from "html2canvas";

class ImageComponent extends Component {
  downloadThis(id) {
    var ele = document.getElementById("photo" + id);

    html2canvas(ele, { useCORS: true, logging:true, letterRendering: 1, allowTaint : true }).then(function (canvas) {
      var a = document.createElement("a");
      a.href = canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream");
      a.download = "photo" + id + ".jpg";
      a.click();
    });
  }

  render() {
    return (
      <div className={styles.compomentsImage}>
        <div className={styles.navigation}>
          <i
            onClick={() => this.downloadThis(this.props.myKey)}
            className="bi bi-arrow-down-circle"
          ></i>
        </div>
        <div id={"photo" + this.props.myKey} className={styles.allPict}>
          <img src={this.props.background} className={styles.background} />
          <img src={this.props.data.newsPic} className={styles.news_pic} />
          <img src={this.props.logo} className={styles.logo} />
          <div dir={`${this.props.data.dir}`} className={styles.text}>
            {this.props.data.newsText}
          </div>
          <div className={styles.source}>
            <p>{this.props.source}</p>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageComponent;
