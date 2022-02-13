import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ImageComponent from "../components/imageComponent";
import React, { Component } from "react";

class Home extends Component {
  state = {
    generate: false,
    back: "https://static.vecteezy.com/system/resources/thumbnails/001/370/782/small_2x/black-with-gold-accent-background-free-vector.jpg",
    logo: "https://hasritv.com/wp-content/uploads/2022/01/Asset-9-300x138-1.png",
    source: "Source Exemple",
    data: [],
  };
  generatePic(e) {
    e.preventDefault();
    if(this.state.data.length==0) alert('Please upload your csv file (newsPic, newsText, dir)')
    else this.setState({ generate: true });
  }

  getData(input, callback) {
    let file = input.target.files[0];
    const delimiter = ",";
    var reader = new FileReader();
    reader.onload = function () {
      var data = reader.result;
      const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
      const titleValues = data.slice(data.indexOf("\n") + 1).split("\n");
      const ansArray = titleValues.map(function (v) {
        const values = v.split(delimiter);
        const storeKeyValue = titles.reduce(function (obj, title, index) {
          obj[title] = values[index];
          return obj;
        }, {});

        return storeKeyValue;
      });

      callback(ansArray);
    };
    reader.readAsText(file);
  }

  getLogo(logo) {
    let file = logo.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        this.setState({ logo: e.target.result });
      }.bind(this);

      reader.readAsDataURL(file);
    }
  }

  getBackground(background) {
    let file = background.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        this.setState({ back: e.target.result });
      }.bind(this);

      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>Welcome to HomePage</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <nav id="nav">
          <div className="nav left">
            <span className="gradient skew">
              <h1 className="logo un-skew">Generator</h1>
            </span>
            <button id="menu" className="btn-nav">
              <span className="fas fa-bars"></span>
            </button>
          </div>
        </nav>

        <main className={styles.main}>
          <form onSubmit={this.generatePic.bind(this)} encType="multipart/form-data">
            <p>Data Form :</p>
            <div className={styles.input_g}>
              <p>Data : </p>
              <input
                onChange={(e) => {
                  this.getData(e, (data) => this.setState({ data: data }));
                }}
                type="file"
                name="Data"
                accept=".csv"
              />
            </div>
            <div className={styles.input_g}>
              <p>Logo : </p>
              <input
                onChange={(e) => {
                  this.getLogo(e);
                }}
                type="file"
                name="Logo"
              />
            </div>
            <div className={styles.input_g}>
              <p>Background : </p>
              <input
                onChange={(e) => {
                  this.getBackground(e);
                }}
                type="file"
                name="Background"
              />
            </div>
            <div className={styles.input_g}>
              <p>Source : </p>
              <input
                onChange={(e) => {
                  this.setState({ source: e.target.value });
                }}
                value={this.state.source}
                type="text"
                name="Source"
              />
            </div>

            <input type="submit" value="Generate" />
          </form>
        </main>

        {this.state.generate ? (
          <section id="output" className={styles.look_like}>
            {this.state.data.map((ele, index) => (
              <ImageComponent
                key={index}
                myKey={index}
                data={ele}
                source={this.state.source}
                background={this.state.back}
                logo={this.state.logo}
              />
            ))}
          </section>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Home;
