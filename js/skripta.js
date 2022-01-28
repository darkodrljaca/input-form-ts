window.onload = function () {
    var studentStorage = new StudentStorage("ime", "prezime", "fakultet", "indeks", "predmeti", "tekst");
};
var Predmet = /** @class */ (function () {
    function Predmet(id, naziv_predmeta, profesor, ocena) {
        this._id = id;
        this._naziv_predmeta = naziv_predmeta;
        this._profesor = profesor;
        this._ocena = ocena;
    }
    Object.defineProperty(Predmet.prototype, "id", {
        /**
         * Getter id
         * @return {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter id
         * @param {number} value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Predmet.prototype, "profesor", {
        /**
         * Getter profesor
         * @return {string}
         */
        get: function () {
            return this._profesor;
        },
        /**
         * Setter profesor
         * @param {string} value
         */
        set: function (value) {
            this._profesor = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Predmet.prototype, "naziv_predmeta", {
        /**
         * Getter naziv_predmeta
         * @return {string}
         */
        get: function () {
            return this._naziv_predmeta;
        },
        /**
         * Setter naziv_predmeta
         * @param {string} value
         */
        set: function (value) {
            this._naziv_predmeta = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Predmet.prototype, "ocena", {
        /**
         * Getter ocena
         * @return {number}
         */
        get: function () {
            return this._ocena;
        },
        /**
         * Setter ocena
         * @param {number} value
         */
        set: function (value) {
            this._ocena = value;
        },
        enumerable: false,
        configurable: true
    });
    return Predmet;
}());
var Student = /** @class */ (function () {
    function Student(ime, prezime, fakultet, broj_indeksa, predmeti) {
        this._polozeni_predmeti = [];
        this._ime = ime;
        this._prezime = prezime;
        this._fakultet = fakultet;
        this._broj_indeksa = broj_indeksa;
        this._setPolozeniPredmeti(predmeti);
    }
    Student.prototype._setPolozeniPredmeti = function (str) {
        var arr = str.split(";"); // id p1, naziv p1, profesor p1, ocena p1;             
        for (var i in arr) {
            var tmp = arr[i].split(",");
            this._polozeni_predmeti.push(new Predmet(Number(tmp[0]), tmp[1], tmp[2], Number(tmp[3])));
        }
    };
    Student.prototype.getPolozeniPredmeti = function () {
        return this._polozeni_predmeti;
    };
    Student.prototype.izracunajProsecnuOcenu = function () {
        var suma_ocena = 0;
        for (var _i = 0, _a = this._polozeni_predmeti; _i < _a.length; _i++) {
            var i = _a[_i];
            suma_ocena += i.ocena;
        }
        var prosek = suma_ocena / this._polozeni_predmeti.length;
        this._prosecna_ocena = prosek.toFixed(2);
    };
    Student.prototype.predstaviSe = function () {
        var ime_prezime = this._ime + " " + this._prezime;
        var naziv_fakulteta = this._fakultet;
        this.izracunajProsecnuOcenu();
        var prosecna_ocena = this._prosecna_ocena;
        return "<p>Ja sam " + ime_prezime + " i studiram na " + naziv_fakulteta + ", sa prosecnom ocenom " + prosecna_ocena + ".</p>";
    };
    return Student;
}());
var StudentStorage = /** @class */ (function () {
    function StudentStorage(imeInput, prezimeInput, fakultetInput, brojIndeksaInput, predmetiInput, jumbo) {
        this._imeInput = document.getElementById(imeInput);
        this._prezimeInput = document.getElementById(prezimeInput);
        this._fakultetInput = document.getElementById(fakultetInput);
        this._brojIndeksaInput = document.getElementById(brojIndeksaInput);
        this._predmetiInput = document.getElementById(predmetiInput);
        this._jumbo = document.getElementById(jumbo);
        this.wireEvents();
    }
    StudentStorage.prototype.wireEvents = function () {
        var _this = this;
        document.getElementById("studentUnosBtn").addEventListener("click", function () {
            _this.unosNovogStudenta();
        });
        document.getElementById("predstavi").addEventListener("click", function () {
            _this.predstaviSveStudente(StudentStorage.fioka);
        });
    };
    StudentStorage.prototype.unosNovogStudenta = function () {
        StudentStorage.fioka.push(new Student(this._imeInput.value, this._prezimeInput.value, this._fakultetInput.value, this._brojIndeksaInput.value, this._predmetiInput.value));
        alert("Student je uspesno unesen.");
        this.ocistiInputPolja();
    };
    StudentStorage.prototype.ocistiInputPolja = function () {
        this._imeInput.value = "";
        this._prezimeInput.value = "";
        this._fakultetInput.value = "";
        this._brojIndeksaInput.value = "";
        this._predmetiInput.value = "";
    };
    StudentStorage.prototype.predstaviSveStudente = function (studenti) {
        if (studenti.length > 0) {
            var str = "";
            for (var _i = 0, studenti_1 = studenti; _i < studenti_1.length; _i++) {
                var student = studenti_1[_i];
                str += student.predstaviSe() + "\n";
            }
            this._jumbo.innerHTML = str;
        }
        else {
            this._jumbo.innerHTML = "Nema unetih studenata.";
        }
    };
    StudentStorage.fioka = [];
    return StudentStorage;
}());
//# sourceMappingURL=skripta.js.map