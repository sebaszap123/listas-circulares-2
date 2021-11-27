class Base {
  constructor(base, minutes) {
    this.base = base;
    this.minutes = minutes;
    this.next = null;
    this.before = null;
  }

  getBase() {
    return this.base;
  }

  getMinutes() {
    return this.minutes;
  }

  getInfo() {
    return `Base: ${this.base}, Duración: ${this.minutes} minutos`;
  }

  infoCard(hour, minutes) {
    return `<div><p>Base: ${this.getBase()}</p><p>Hora de llegada: ${hour}</p><p>Minutos restantes: ${minutes}</p>                                 
                </div>`;
  }
}

class Data {
  constructor() {
    this.start = null;
    this.count = 0;
  }

  add(base) {
    if (this.start === null) {
      this.start = base;
      base.next = this.start;
      base.previous = this.start;
      this.count++;
    } else {
      let last = this.start.previous;
      base.next = this.start;
      base.previous = last;
      last.next = base;
      this.start.previous = base;
      this.count++;
    }
  }

  list() {
    let listInfo = "";
    let temp = this.start;
    if (temp == null) {
      return "<div>La lista está vacía </div>";
    } else {
      let temp = this.start;
      do {
        listInfo += `<div>${temp.getInfo()}</div></br>`;
        temp = temp.next;
      } while (temp != this.start);
      return listInfo;
    }
  }

  delete(name) {
    let delBase;
    let tail;
    let next;
    if (this.start == null) {
      return null;
    } else if (this.start.getBase() == name && this.count === 1) {
      delBase = this.start;
      this.start = null;
      delBase.next = null;
      delBase.previous = null;
      this.count--;
      return delBase;
    } else if (this.start.getBase() == name) {
      delBase = this.start;
      tail = delBase.previous;
      next = delBase.next;
      this.start = next;
      this.start.previous = last;
      tail.next = this.start;
      delBase.previous = null;
      delBase.next = null;
      this.count--;
      return delBase;
    } else {
      let previous = this.start;
      let current = this.start.next;
      while (current !== this.start) {
        if (current.getBase() == name && current.next == this.start) {
          delBase = current;
          next = delBase.next;
          previous.next = next;
          next.previous = previous;
          delBase.next = null;
          delBase.before = null;
          this.count--;
          return delBase;
        } else {
          previous.current;
          current.current.next;
        }
      }
      return null;
    }
  }

  createCard(base, hour, minutes) {
    let card = "";
    let hours = 0;
    let find = this._findBase(base);

    if (!find) {
      return null;
    } else {
      while (minutes >= 0) {
        card +=
          find.infoCard(this._hoursConvert(hour, hours), minutes) +
          "\n" +
          "------------------------------";
        hours += find.next.getMinutes();
        minutes -= find.next.getMinutes();
        find = find.next;
      }
      return card;
    }
  }

  _hoursConvert(hour, minutes) {
    let hourMinutes = (hour * 60 + minutes) / 60;
    let hoursTotal = Math.trunc(hourMinutes);
    let minusMinutes = Math.round((hourMinutes - hoursTotal) * 60);
    if (minusMinutes < 10) {
      return `${hoursTotal}:0${minusMinutes}`;
    } else {
      return `${hoursTotal}:${minusMinutes}`;
    }
  }

  _findBase(name) {
    let nameBase = this.start;
    if (!nameBase) {
      return null;
    } else {
      do {
        if (nameBase.getBase() == name) {
          return nameBase;
        } else {
          nameBase = nameBase.next;
        }
      } while (nameBase !== this.start);
      return null;
    }
  }
}

let CircleData = new Data();

let details = document.getElementById("details");

const btnDelete = document.getElementById("btnDelete");

btnDelete.addEventListener("click", () => {
  let name = document.getElementById("nameDelInp").value;
  let deleteBase = CircleData.delete(name);
  if (deleteBase) {
    details.innerHTML = `<div>La base ${name} se elimino</div>`;
  } else if (!name) {
    details.innerHTML = `<div>Ingresa la base a eliminar</div>`;
  } else {
    details.innerHTML = `<div>La base ${name} no existe</div>`;
  }
});

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
  let name = document.getElementById("nameInp").value;
  let duration = Number(document.getElementById("minutesInp").value);
  let CircleBase = new Base(name, duration);
  CircleData.add(CircleBase);
  details.innerHTML = `<div>La base ${CircleBase.getBase()} se creo</div>`;
});

const btnList = document.getElementById("btnList");
btnList.addEventListener("click", () => {
  let listChecker = CircleData.list();
  if (!listChecker) {
    details.innerHTML = "<div>Lista vacia </div>";
  }
  details.innerHTML = `${CircleData.list()}`;
});

let btnCreateCard = document.getElementById("btnCreateCarc");

btnCreateCard.addEventListener("click", () => {
  let base = document.getElementById("CardInp").value;
  let hour = Number(document.getElementById("hourCardInp").value);
  let minutes = Number(document.getElementById("minutesInp").value);
  let cardCreated = CircleData.createCard(base, hour, minutes);
  if (!CircleData) {
    details.innerHTML = "<div>Lista vacia</div>";
  } else if (!cardCreated) {
    details.innerHTML = `<div>La base: ${base} no existe</div>`;
  } else {
    details.innerHTML = `<div>La ruta comienza en la base: ${base}</div> </br>
        <div>Más información: </div> </br>
        <div>${cardCreated}</div>`;
  }
});
