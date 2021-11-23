import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/pro-regular-svg-icons";
import LoaderDots from "@components/loader/Loader";
import { faPlusCircle } from "@fortawesome/pro-light-svg-icons";
import Loader from "react-loader-spinner";

/**
 * Return percent of value / total
 * @param {int} value
 * @param {int} total
 */
const calculatePercent = (value, total) => Math.round((value / total) * 100);

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.formatPicture = this.formatPicture.bind(this);
    // this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      file: null,
      percent: 0,

      loading: false,
      submitted: false,
    };
  }

  handleChange = (event) => {
    this.setState({ file: event.target.files, submitted: false });
  };
  formatPicture = (url) => {
    if (url === null || url === undefined) return url;
    return (
      url?.split("upload/").slice(0, 1) +
      "upload/c_thumb,h_150,w_150/" +
      url?.split("upload/").slice(1, 2)
    );
  };

  // handleRemove = (index) => {
  //   const list = [...files];
  //   list.slice(index, 1);
  //   setFiles(list);
  // };
  handleAddSubmit = async (event) => {
    event.preventDefault();
    event.preventDefault();
    await this.handleChange(event);
    this.props.setFileLoading(true);
    this.setState({ loading: true, submitted: true });

    const data = new FormData();
    Array.from(this.state.file).forEach((image) => data.append("files", image));

    const upload_res = await axios({
      method: "POST",
      url: "https://api.bookatask.com/upload",
      data,
      onUploadProgress: (progress) =>
        this.setState({
          percent: calculatePercent(progress.loaded, progress.total),
        }),
    });

    upload_res.data.map((file) =>
      this.props.setFiles([...this.props.files, file])
    );
    this.setState({ loading: false });
    this.props.setFileLoading(false);
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    event.preventDefault();
    await this.handleChange(event);
    this.props.setFileLoading(true);
    this.setState({ loading: true, submitted: true });

    const data = new FormData();
    Array.from(this.state.file).forEach((image) => data.append("files", image));

    const upload_res = await axios({
      method: "POST",
      url: "https://api.bookatask.com/upload",
      data,
      onUploadProgress: (progress) =>
        this.setState({
          percent: calculatePercent(progress.loaded, progress.total),
        }),
    });

    this.props.setFiles(upload_res.data);
    this.setState({ loading: false });
    this.props.setFileLoading(false);
  };
  //   upload_res.data.map((file) =>
  //   this.props.setFiles([...this.props.files, file])
  // );
  render() {
    return (
      <div className="FileUpload">
        <form className="relative flex items-center ">
          <div className="flex flex-wrap gap-1">
            {this.props.files ? (
              this.props.files.map((file, index) => (
                <div
                  className="inline-block h-[52px] w-[79px] cursor-pointer rounded-[12px] bg-black group relative  transition"
                  key={index}
                >
                  <span
                    className="absolute z-20 group-hover:!block hidden  text-lg right-1 text-white"
                    onClick={() =>
                      this.props.setFiles(
                        this.props.files.filter((value, i) => i != index)
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="!text-[18px]"
                    />
                  </span>
                  <img
                    className="h-[52px] w-[79px] object-cover group-hover:opacity-60 rounded-[12px] cursor-pointer"
                    alt={file.name}
                    src={this.formatPicture(file.url)}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
            {this.state.loading && (
              <div className="h-[52px] w-[79px]  rounded-[12px] bg-primaryLightBlue flex justify-center items-center">
                <Loader
                  type="TailSpin"
                  color={process.env.NEXT_PUBLIC_PRIMARY || "#1579B9"}
                  height={20}
                  width={20}
                />
              </div>
            )}

            {this.props.files ? (
              <button
                type="button"
                onClick={() =>
                  document.getElementById("addInputButton").click()
                }
                className={
                  "inline-block cursor-pointer font-bold  text-xl border-dashed border-gray-300 border-2 bg-gray-100 h-[52px] w-[79px]  rounded-[12px] "
                }
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="opacity-30 !text-[17px]"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  document.getElementById("uploadInputButton").click()
                }
                className={
                  "inline-block cursor-pointer font-bold  text-xl border-dashed border-gray-300 border-2 bg-gray-100 h-[52px] w-[79px]  rounded-[12px] "
                }
                value="+"
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="opacity-30 !text-[17px]"
                />
              </button>
            )}
          </div>

          {/* <span className="text-red-600 text-4xl mr-1">*</span> */}
          <input
            id="uploadInputButton"
            multiple={true}
            onChange={(event) => this.handleSubmit(event)}
            type="file"
            accept="*/*"
            placeholder="+"
            required={this.props.required}
            className="hidden placeholder-gray-400 text-gray-400"
          />
          <input
            id="addInputButton"
            accept="*/*"
            multiple={true}
            onChange={(event) => this.handleAddSubmit(event)}
            type="file"
            placeholder="+"
            required={this.props.required}
            className="hidden placeholder-gray-400 text-gray-400"
          />
        </form>
        {/* {submitted && (
          <div className="Progress h-2">
            <div
              className="Progress__Seek h-2 bg-green-500"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        )}

        {!loading && submitted && (
          <p className="w-full text-center text-green-500">
            Снимката е качена успешно{" "}
          </p>
        )} */}
      </div>
    );
  }
}
