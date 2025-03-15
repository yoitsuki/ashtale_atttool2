document.getElementById("calculate").addEventListener("click", function() {
    let fields = ["atk", "str_int", "agi_mind", "intimidation", "damage_rate", 
                  "damage_bonus", "crit_damage", "ignore_def", "boss_damage", 
                  "status_damage", "high_hp_damage", "low_hp_damage"];

    let resultTable = document.querySelector("#result-table tbody");
    resultTable.innerHTML = "";

    let total = 0;
    fields.forEach(field => {
        let value = Number(document.getElementById(field).value) || 0;
        total += value;
        let row = `<tr><td>${field}</td><td>${value * 2}</td><td>${value * 2}%</td></tr>`;
        resultTable.innerHTML += row;
    });

    let baseAtkRow = `<tr><td>基礎攻撃力 (目安)</td><td></td><td>${total}</td></tr>`;
    resultTable.innerHTML += baseAtkRow;
});

document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("status-form").reset();
    document.querySelector("#result-table tbody").innerHTML = "";
});

document.getElementById("save").addEventListener("click", function() {
    let params = new URLSearchParams(window.location.search);
    let sheetId = params.get("id");
    if (!sheetId) {
        alert("スプレッドシートIDが指定されていません");
        return;
    }

    let data = { date: new Date().toISOString() };
    document.querySelectorAll("input").forEach(input => {
        data[input.id] = input.value;
    });

    fetch(`https://script.google.com/macros/s/${sheetId}/exec`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => alert("保存しました！"));
});