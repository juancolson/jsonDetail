const Home = () => {

  var data = ""

  function submittedNum(e) {
    e.preventDefault()
    var num = "https://nhentai.net/api/gallery/" + e.target.number.value
    window.open(num, "_blank")
  }

  function submittedForm(e) {
    e.preventDefault()
    var input = e.target.data.value

    var sample = JSON.parse(input)


    var response = {}

    // if (canParse) {
    response["title"] = sample.title.pretty


    var mainInfo = sample.tags

    var tagList = []
    mainInfo.forEach(element => {
      if (element.type == "artist") {
        response["author"] = element.name
      }

      if (element.type == "tag") {
        tagList.push(element.name)
      }
      tagList.sort()
      response["genre"] = tagList
    });
    document.getElementById("resp").value = JSON.stringify(response, null, 4)

    data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(response, null, 4));

    console.log(data);
    var a = document.getElementById("dwn")
    a.href = 'data:' + data


    // }
  }
  return (
    <div className="w-screen h-screen">

      <form onSubmit={submittedNum} className="m-3 w-11/12">
        <input type="number" name="number" className="border border-black" />
        <button type="submit" className="rounded-xl bg-blue-700 w-9">GO</button>
      </form>
      <button className="rounded bg-blue-700 text-white" onClick={() => {
        navigator.clipboard.readText().then((clipText) => (document.getElementById("paste").value = clipText));
      }}>PASTE</button>
      <form onSubmit={submittedForm} className="m-3 w-11/12">
        <textarea name="data" id="paste" className="border border-black w-full h-60 min-h-[50%]" />
        <button type="submit" className="rounded-xl bg-blue-700 w-9">GO</button>
      </form>


      <textarea id="resp" className="border m-3 border-black w-11/12 h-3/6" />
      <button><a download={'details.json'} id="dwn" className="rounded-xl bg-blue-700">Download</a></button>
    </div>
  );
}

export default Home;
