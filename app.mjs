import fs from 'node:fs/promises';
/* Se espera un archivo .CSV */
const fileToRead = "./.csv"

const object = []

const main = async function () {
  let data;
  try {
    data = await fs.readFile(fileToRead, 'utf8');
  } catch (error) {
    console.log(error)
  }
  const formatData = data.split('\n');
  const header =  formatData[0].split(",")
  formatData.shift()

/* Seteamos el formato y las columnas que va a tener nuestro objeto / JSON */
  header.forEach((column) => {
    object.push(
      {
        column : column,
        data: []
      }
    )
  })
/* Insertamos la data de cada fila en la columna que le corresponde ordenamente */
  formatData.forEach((x, i)=>{
    const campos = formatData[i].split(',');
    campos.forEach((rows, index)=>{
      object[index].data.push(rows)
    })
  })
/* Creamos un archivo JSON */
  const nameJson = fileToRead.replace(/\.[^.]+$/, '') + ".json";
  const json = JSON.stringify(object)
  try {
    await fs.writeFile(nameJson, json)
  } catch (error) { 
    console.log(error)
  }
}
main()
