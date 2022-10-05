function deg2rad(degree) {
    return degree * (Math.PI/180)
}

function project2sphere(sphereRadius, angles) {
    //(x,y,z)=(ρcosθsinϕ,ρsinθsinϕ,ρcosϕ)
    const [longitude, colatitude] = [deg2rad(angles.yaw), deg2rad(90 - angles.pitch)]
    const [x,y,z] = [sphereRadius * Math.cos(longitude) * Math.sin(colatitude),
        sphereRadius * Math.sin(longitude) * Math.sin(colatitude),
        sphereRadius * Math.cos(colatitude)]
    return [x,y,z]
}

export {project2sphere}