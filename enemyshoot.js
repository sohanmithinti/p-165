AFRAME.registerComponent("enemy-bullets", {
    init: function(){
        this.life = 2
        shootTimer = setInterval(this.shootEnemyBullet, 3000)
    },
    shootEnemyBullet: function(){
        var enemies = document.querySelectorAll(".enemy")
        for(var i = 0; i< enemies.length; i++){
            var enemyBullet = document.createElement("a-entity")
            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            })
            enemyBullet.setAttribute("material", "color", "#282B29")
            var position = enemies[i].getAttribute("position")
            enemyBullet.setAttribute("position", {x: position.x + 1.5, y: position.y+ 3.5, z: position.z})
            var scene = document.querySelector("#scene")
            scene.appendChild(enemyBullet)
            var enemy = enemies[i].object3D
            var player = document.querySelector("#weapon").object3D
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2) 
            var direction = new THREE.Vector3()
            direction.subVectors(position1, position2).normalize() 
            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10))
            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0"
            }) 
            enemyBullet.addEventListener("collide", (e) => {
                if(e.detail.body.el.id === "weapon"){
                    console.log(" collision happned")
                    var element = document.querySelector("#countLife")
                    var playerLife = parseInt(element.getAttribute("text").value)
                    if(playerLife > 0){
                        playerLife = playerLife -1
                        this.life = playerLife
                        element.setAttribute("text", {
                            value: playerLife
                        })
                    }
                }
            })
            if(this.life === 0){
                clearInterval(shootTimer)
                var text = document.querySelector("#over")
                text.setAttribute("visible", true)
                var tank_entity = document.querySelectorAll(".enemy")
                for(var i = 0; i < tank_entity.length; i++){
                    scene.removeChild(tank_entity[i]) 
                }
                var entity1 = document.querySelector("#bullet")
                entity1.removeAttribute("bullets")
            }
        }
    }
})