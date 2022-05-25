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
    a.download = sample.title.pretty + '.json'


    // }
  };

  return (
    <div className="w-screen h-screen flex flex-col">

      <form onSubmit={submittedNum} className="m-3 w-11/12">
        <input type="number" name="number" className="border border-black w-full" />
        <button type="submit" className="rounded bg-blue-700 text-white p-2 w-full">GO</button>
      </form>
      <button className="rounded bg-blue-700 text-white p-2" onClick={() => {
        navigator.clipboard.readText().then((clipText) => (document.getElementById("paste").value = clipText));
      }}>PASTE</button>
      <form onSubmit={submittedForm} className="m-3 w-11/12">
        <textarea name="data" id="paste" className="border border-black w-full h-60 min-h-[50%] p-2" />
        <button type="submit" className="rounded-xl bg-blue-700 w-full p-2">GO</button>
      </form>


      <textarea id="resp" className="border m-3 border-black w-11/12 h-3/6 p-2" />
      <button className="rounded bg-blue-700 text-white p-2 w-full"><a id="dwn" >Download</a></button>
    </div>
  );
}

export default Home;
